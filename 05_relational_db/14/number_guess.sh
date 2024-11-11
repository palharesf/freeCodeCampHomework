#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=guesses -t --no-align -c"
## echo $($PSQL "TRUNCATE users")

echo Enter your username:
read USERNAME

RANDGUESS=${RANDOM:0:3}
## echo Random number: $RANDGUESS

USER_ID_RESULT=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME';")
#echo User ID $USER_ID_RESULT

if [[ -z $USER_ID_RESULT ]]
then
  ## case username does not exist
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  CREATEUSER=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME');")
  BEST_GAME=10000
  TRIES=0
  GAMES_PLAYED=0
    
else
  ## case username exists
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username = '$USERNAME';")
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username = '$USERNAME';")
  echo -e "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  TRIES=0

fi

echo Guess the secret number between 1 and 1000:

GUESS_LOGIC () {
  read USER_GUESS
  if [[ "$USER_GUESS" =~ ^[0-9]+$ ]]; 
  then
    if [[ "$USER_GUESS" -gt "$RANDGUESS" ]]
    then
    ## case lower
      echo "It's lower than that, guess again:"
      let TRIES+=1
      GUESS_LOGIC
    
    else
      if [[ "$USER_GUESS" -lt "$RANDGUESS" ]]
      then
        ## case higher
        echo "It's higher than that, guess again:"
        let TRIES+=1
        GUESS_LOGIC
      
      else
        ## case guess correct
        let TRIES+=1
        UPDATE_GAMES=$($PSQL "UPDATE users SET games_played = ($GAMES_PLAYED + 1) WHERE username = '$USERNAME';")

        ## update best loop
        if [[ $TRIES -lt $BEST_GAME ]]
        then
          UPDATE_BEST=$($PSQL "UPDATE users SET best_game = $TRIES WHERE username = '$USERNAME';")
        fi

        echo "You guessed it in $TRIES tries. The secret number was $RANDGUESS. Nice job!"
      fi
    fi
  else
    echo That is not an integer, guess again:
    GUESS_LOGIC
  fi      
}

GUESS_LOGIC
