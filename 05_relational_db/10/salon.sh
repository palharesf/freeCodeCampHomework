#!/bin/bash
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ MY SALON ~~~~~\n"
echo -e "\nWelcome to my salon, how can I help you?\n"

MAIN_MENU() {

  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo "Here are the list of services:"
  echo -e "\n1) Haircut\n2) Waxing\n3) Beard Trim"
  echo "Please make your selection:"

  read SERVICE_ID_SELECTED
  SERVICE_MENU
}

SERVICE_MENU() {

  SERVICE=$($PSQL "SELECT name FROM services WHERE service_id = '$SERVICE_ID_SELECTED';")
  echo -e "\nService selected: $SERVICE"
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  # check if customer_phone has record
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE';")
  #echo "Customer name: $CUSTOMER_NAME"

  if [[ -z $CUSTOMER_NAME ]]
  # if customer doesn't exist
  then
    echo -e "\nI could not find you in the system. Please type your name so I can add you."
    read CUSTOMER_NAME
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME');")
    sleep .1s
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE' OR name = '$CUSTOMER_NAME';")
    #echo "Customer ID: $CUSTOMER_ID"

    echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
    read SERVICE_TIME
    INSERT_SERVICE_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES('$CUSTOMER_ID', '$SERVICE_ID_SELECTED', '$SERVICE_TIME');")
    echo -e "\nI have put you down for a $SERVICE at $SERVICE_TIME, $CUSTOMER_NAME."
  
  # if phone record exists
  else
    echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
    read SERVICE_TIME
    echo -e "\nI have put you down for a $SERVICE at $SERVICE_TIME, $CUSTOMER_NAME."
  fi
}

MAIN_MENU
