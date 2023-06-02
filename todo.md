<!-- Registration form -->
# 1. Create the login form component
# 2. Import icons
# 3. Create regexp for username and pswd
# 4. Preparing useRef hooks for user and err msgs

# 5. Added states: user string and booleans for validation and focus
# 6. Added states: pswd string and booleans for validation and focus
# 7. Added states: pswd match string and booleans for validation and focus

# 8. useEffect: firstly focus on username field
# 9. useEffect: (1) check username regexp (2) set boolean result of checked username
# 10. UseEffect: (1) check pwd regexp (2) set boolean result of checked pwd (3) check match pwd with matchPwd (4) set boolean result of checked matches

# 11. Added area for error message with dynamic css
# 12. Added inputs with tips areas and validation: user, password, matchPassword and submit button

# 13. Added form submit async function with validation inside 
# 14. Preparing axios baseUrl for continously using: axios.create()
# 15. (axios / fetch) try/catch block for axios post request with 3 args: register url, jsonBody, config (headers application/json, withCredentials)

<!-- Login form -->

# 16. Created userRef and errRef and added user, pwd, error and success (boolean) states
# 17. Added focus to login in useEffect
# 18. Added setErr in useEffect with deps (name, pwd)

# 19. Added area for error message with dynamic css
# 20. Added inputs with tips areas: user, password and submit button

# 21. Added form submit async function with validation inside 

# 23. (axios / fetch) try/catch block for axios post request with 3 args: register url, jsonBody, config (headers application/json, withCredentials)