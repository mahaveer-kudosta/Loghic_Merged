#!/bin/bash

# Fix imports for context module
find client/src -type f -name "*.js" -exec sed -i 's/from "context"/from ".\/context"/g' {} \;
find client/src -type f -name "*.js" -exec sed -i 's/from "context\//from ".\/context\//g' {} \;

# Fix imports for components module
find client/src -type f -name "*.js" -exec sed -i 's/from "components\//from ".\/components\//g' {} \;

# Fix imports for layouts module
find client/src -type f -name "*.js" -exec sed -i 's/from "layouts\//from ".\/layouts\//g' {} \;

# Fix imports for assets module
find client/src -type f -name "*.js" -exec sed -i 's/from "assets\//from ".\/assets\//g' {} \;

# Fix imports for examples module
find client/src -type f -name "*.js" -exec sed -i 's/from "examples\//from ".\/examples\//g' {} \;

# Fix imports for routes module
find client/src -type f -name "*.js" -exec sed -i 's/from "routes"/from ".\/routes"/g' {} \;

# Fix imports for frontend module
find client/src -type f -name "*.js" -exec sed -i 's/from "frontend\//from ".\/frontend\//g' {} \;

# Fix imports for auth module
find client/src -type f -name "*.js" -exec sed -i 's/from "auth\//from ".\/auth\//g' {} \;

# Fix imports for services module
find client/src -type f -name "*.js" -exec sed -i 's/from "services\//from ".\/services\//g' {} \;

# Fix imports for App module
find client/src -type f -name "*.js" -exec sed -i 's/from "App"/from ".\/App"/g' {} \;

# Fix imports for utils module
find client/src -type f -name "*.js" -exec sed -i 's/from "utils\//from ".\/utils\//g' {} \;
