
    sequenceDiagram
        participant user as User
        participant browser as Browser
        participant server as Server
    
    user->>browser: Clicks "Tallenna" button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with note content
    activate server
    server-->>browser: 302 Redirect to /notes
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server
    
    Note right of browser: JavaScript code starts executing and initiates JSON data fetch
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
    
    Note right of browser: Browser renders the updated list of notes

