![Spentoday banner](./assets/banner.svg)

---

If you are afraid of losing money, spend it today. Live without fear.
Selling platform of future for customers and business owners.

Website: [spentoday.com](https://www.spentoday.com)

Shop GitHub repo: [flurium/spentoday-shop](https://github.com/flurium/spentoday-shop)
Api GitHub repo: [flurium/spentoday-api](https://github.com/flurium/spentoday-api)

Spelling: spen + to + day (do it as italian)

Technical requirements!: [docs/tech-requirements](./docs/tech-requirements.md)

## Developing

Clone the repository:

```bash
git clone https://github.com/flurium/spentoday.git
```

Get inside of folder:

```bash
cd spentoday
```

Use dev branch:

```bash
git checkout dev
```

From install dependencies:

```bash
npm install
```

Set environment variable on your machine, so it works with local backend.
Not in .env file, but in machine settings.

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Setup .env file for:

```bash
PUBLIC_API_URL=https://localhost:44303
```

Start development server:

```bash
npm run dev
```

Run next command to watch for code changes and generate types when changes appear:

```bash
npm run check:watch
```

### Resources to learn Svelte

- [Svelte Docs](https://svelte.dev/docs/) for ui.
- [SvelteKit Docs](https://kit.svelte.dev/docs/) for loading data, server-side renderin, routing.
