# Song App Fullstack

## I developed a FullStack project for Fullstack Challenge Step 2.

**Song** is an application that allows users to add their songs information (e.g., title, artist name, difficulty, category, imageurl, songurl, description and date). They can also delete it or edit it anytime.

### I used NextJS which is React Framework for SSR

### Tech Stack

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- npm packages

## Problems which are encountered and solved

- Data fetching in NextJS with getStaticProps(date) => [superjson npm package](https://github.com/blitz-js/superjson)
- Date filter today error because of date format => [momentjs npm package](https://www.npmjs.com/package/moment) <br/>
  **_By the way_**, the date filter is based on the update date. If we go inside the song (detail page). That song now appears in the today section of the date filter. The date we entered in the form is published date. You can see the published date on the detail page.
- react-player get song duration and played time => [react-player npm package](https://www.npmjs.com/package/react-player)

# How to use

- Actually we don't need to how to use guide because of i deployed but if you want to see development environment you can move on. I add the link on the below.

- **_[Song-App-Fullstack](https://song-app-fullstack.vercel.app/)_**

## Configuration

### Step 1. Get the connection string of your MongoDB server

We don't need for now because of i connected.

### Step 2. Set up environment variables

We don't need for now because of i set up.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)
If you want to see the database in local you can go 'api/songs' [http://localhost:3000/api/songs](http://localhost:3000/api/songs)
To see database in production [https://song-app-fullstack.vercel.app/api/songs](https://song-app-fullstack.vercel.app/api/songs)

# Actually, I recommend you to go to the link I gave you to see the performance. [Song-App-Fullstack](https://song-app-fullstack.vercel.app/)

### Thanks for helping me explore myself. This challenge has been very instructive for me. I learned about myself what i can do and what i cant.

### Thank you for taking the time to assessment.
