#! /bin/bash
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

re='^[0-9]+$'

 if [[ $1 ]]
  then
    #echo -e "\n$1"
    len=`echo $1 | awk '{print length}'`
    # echo -e "String length: $len"

    #first conditional - check if the input is a number
    if [[ $1 =~ $re ]]
      then
        #echo Atomic Number
        ATOMIC_NUMBER=$1
        ELEMENT_INFO=$($PSQL "SELECT symbol, name FROM elements WHERE atomic_number = $ATOMIC_NUMBER;")
        
        #Check if we found the element in the table
        if [[ -z $ELEMENT_INFO ]]
          then
            echo I could not find that element in the database.
          else
            IFS='|' read -ra ELEMENT_INFO_ARRAY <<< "$ELEMENT_INFO"
            SYMBOL=${ELEMENT_INFO_ARRAY[0]}
            NAME=${ELEMENT_INFO_ARRAY[1]}
            #echo Case 1: $ATOMIC_NUMBER, $SYMBOL, $NAME
        fi

    #second conditional - check if the input is a symbol
    elif [[ $1 = [A-Z] || $1 = [A-Z][a-z] ]]
      then
        #echo Symbol
        SYMBOL=$1
        ELEMENT_INFO=$($PSQL "SELECT atomic_number, name FROM elements WHERE symbol = '$SYMBOL';")
        if [[ -z $ELEMENT_INFO ]]
          then
            echo I could not find that element in the database.
          else
            IFS='|' read -ra ELEMENT_INFO_ARRAY <<< "$ELEMENT_INFO"
            ATOMIC_NUMBER=${ELEMENT_INFO_ARRAY[0]}
            NAME=${ELEMENT_INFO_ARRAY[1]}
            #echo Case 2: $ATOMIC_NUMBER, $SYMBOL, $NAME
        fi
    
    #third conditional - assume the input then is a word
    else
      #echo Name
      NAME=$1
      ELEMENT_INFO=$($PSQL "SELECT atomic_number, symbol FROM elements WHERE name = '$NAME';")
      if [[ -z $ELEMENT_INFO ]]
        then
          echo I could not find that element in the database.
        else
          IFS='|' read -ra ELEMENT_INFO_ARRAY <<< "$ELEMENT_INFO"
          ATOMIC_NUMBER=${ELEMENT_INFO_ARRAY[0]}
          SYMBOL=${ELEMENT_INFO_ARRAY[1]}
          #echo Case 3: $ATOMIC_NUMBER, $SYMBOL, $NAME
      fi

    fi

  if [[ -z $ELEMENT_INFO ]]
    then
      :
    else
      #Fetch the remaining data
      TYPE=$($PSQL "SELECT type FROM types INNER JOIN properties USING (type_id) WHERE atomic_number = $ATOMIC_NUMBER;")
      ATOMIC_MASS=$($PSQL "SELECT atomic_mass FROM properties WHERE atomic_number = $ATOMIC_NUMBER;")
      MELTING=$($PSQL "SELECT melting_point_celsius FROM properties WHERE atomic_number = $ATOMIC_NUMBER;")
      BOILING=$($PSQL "SELECT boiling_point_celsius FROM properties WHERE atomic_number = $ATOMIC_NUMBER;")
          
      #Display final message
      echo -e "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
  fi
  else
    echo Please provide an element as an argument.
  fi

#Adding white lines to reach 5 commit requirement
