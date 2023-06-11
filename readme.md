# ✂️ Short URL

URL shortening service deployed on Vercel: [hanayabuki.cf](hanayabuki.cf)

## 🔍 How to deploy it on [vercel.com](vercel.com)?

1. 🛠 clone this repository in github under your own account.
2. 💵 prepare a mongodb database. Ensure that it contains a database named `shorturl`, and a collection named `links`.
3. ⛓ link your corresponding repository in github in Vercel.
4. 📥 add a key named `DB_URI` to the environment variables of the Vercel project with the value of the mongodb connection address. Format e.g. `mongodb+srv://root:<password>@<username>.mongodb.net/?retryWrites=true&w=majority`
5. 📧 commit the deployment locally with `vercel --prod` command using the Vercel CLI.
6. 📌 (Optionally) bind the project to a very short, very short domain name.

## 📑 LICENSE

MIT
