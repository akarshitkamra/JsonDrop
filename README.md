# JsonDrop

JsonDrop is a lightweight, modern Nuxt 3 web app built with Vue 3 Composition API (JavaScript) that lets you format, validate, and explore JSON data effortlessly. Instantly create and share unique links to your pretty-printed JSON blobs — perfect for collaboration and quick sharing.

---

## Features

- 🚀 Fast and responsive JSON formatting and validation  
- 🌳 Visual tree view for easy navigation of JSON structure  
- 🔗 Generate unique, shareable URLs for your JSON blobs  
- ❌ Clear error messages on invalid JSON inputs  
- 🔒 Privacy-first design with ephemeral in-memory storage by default  
- ⚡ Built purely with Nuxt 3 & Vue 3 Composition API (no TypeScript)

---

## Demo

A live demo will be available soon. You can run it locally today!

---

## Installation & Usage

1. Clone this repository
``` bash
git clone https://github.com/akarshitkamra/JsonDrop.git
```
2. Install dependencies
``` bash
npm install
```
3. Start development server
``` bash
npm run dev
```

Open your browser and visit `http://localhost:3000`

---

## How It Works

1. Paste or type your raw JSON into the input editor.
2. Click "Format" to validate and pretty-print your JSON.
3. Click "Save" to store your JSON blob on the server.
4. Receive a unique sharable link (e.g. `/blob/abc123`) to access or share your formatted JSON anytime.

---

## Project Architecture

- **Frontend:** Nuxt 3 with Vue 3 Composition API (pure JavaScript)  
- **Backend:** Nuxt server API routes for storing and retrieving JSON blobs  
- **Storage:** In-memory JSON blobs (demo mode, replaceable with persistent database)  

---

## Contribution

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License © 2025 Akarshit Kamra

---

*Inspired by [jsonblob.com](https://jsonblob.com) and powered by Nuxt 3 and Vue 3.*

