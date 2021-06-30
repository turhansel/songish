# Songish

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/turhansel/songish/blob/master/LICENSE)

## Deploy your own

Once you have access to [the environment variables you'll need](#step-2-set-up-environment-variables), deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/turhansel/songish&project-name=songish&repository-name=songish&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB&envLink=https://github.com/vercel/next.js/tree/canary/examples/songish%23step-2-set-up-environment-variables)

## I developed a FullStack project to improve myself.

**Songish** is an application that allows users to add their songs information (e.g., title, artist name, difficulty, category, imageurl, songurl, description and date). They can also delete it or edit it anytime.

### I used NextJS which is React Framework for SSR

### Tech Stack

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- npm packages

## How to use

- **_[Songish](https://songish.vercel.app/)_**

## Configuration

### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

- Your app should be up and running on [http://localhost:3000](http://localhost:3000)
- If you want to see the database in local you can go [http://localhost:3000/api/songs](http://localhost:3000/api/songs)
- To see database in production [https://song-app-fullstack.vercel.app/api/songs](https://songish.vercel.app/api/songs)

### If you want to see the biography of the artist, you should click the more information button on the detail page. I fetched this data from [https://www.theaudiodb.com/api_guide.php](https://www.theaudiodb.com/api_guide.php)
