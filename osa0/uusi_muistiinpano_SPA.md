    sequenceDiagram
        participant user as User
        participant browser as Browser
        participant server as Server
  
      user->>browser: Clicks "Tallenna" button
      Note right of browser: JavaScript captures the note content and initiates save process
  
      browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with note content
      activate server
      server-->>browser: Confirmation response (e.g., {"status": "success"})
      deactivate server
  
      Note right of browser: JavaScript updates the note list in the browser without page reload
      browser->>browser: Render updated notes list
