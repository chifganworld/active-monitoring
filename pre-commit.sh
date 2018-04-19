#!/bin/sh
NC='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'

echo "----==== Running Mix tests ====----"
docker-compose run --rm -e MIX_ENV=test app mix do compile --force --warnings-as-errors, test
MIX=$?

if [ $MIX -eq 0 ]; then
  echo "${GREEN}OK${NC}";
fi

echo "----==== Running Flow tests ====----"
docker-compose run --rm webpack yarn flow check
FLOW=$?

if [ $FLOW -eq 0 ]; then
  echo "${GREEN}OK${NC}";
fi

echo "----==== Running Eslint tests ====----"
docker-compose run --rm webpack yarn lint
ESLINT=$?

if [ $ESLINT -eq 0 ]; then
  echo "${GREEN}OK${NC}";
fi

if [ $MIX -eq 0 ] && [ $FLOW -eq 0 ] && [ $ESLINT -eq 0 ]; then
  echo "${GREEN}----==== Good to go! ====----${NC}"
else
  echo "${RED}----==== Oops! ====----${NC}"
  if [ $MIX -ne 0 ]; then
  echo "${RED}Mix tests failed${NC}";
  fi
  if [ $FLOW -ne 0 ]; then
    echo "${RED}Flow tests failed${NC}";
  fi
  if [ $ESLINT -ne 0 ]; then
    echo "${RED}ESLint tests failed${NC}";
  fi
  echo "${RED}----==== Oops! ====----${NC}"
fi
