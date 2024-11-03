    sequenceDiagram
        participant user as User
        participant browser as Browser
        participant server as Server
  
      user->>browser: Navigates to https://studies.cs.helsinki.fi/exampleapp/spa
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      activate server
      server-->>browser: HTML document
      deactivate server
      
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      activate server
      server-->>browser: CSS file
      deactivate server
      
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
      activate server
      server-->>browser: JavaScript file
      deactivate server
  
      Note right of browser: JavaScript code is executed in the browser, initiating data fetch from server
  
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      activate server
      server-->>browser: [{ "content": "SPA is smooth", "date": "2023-1-1" }, ... ]
      deactivate server
  
      Note right of browser: Browser renders the notes using fetched JSON data
