> **Consideration:**
>
> This will be my last commit for now. The project is starting to get more complex as i'm implementing more things and i think i'm getting stucked trying to do my **best**. I already refactorize this project like 3 times now and it was supposed to be a small silly website, it has been four months since i've been working on this and there's a ton to do.
>
> Probably, in a nearby future, i'll make a similar project like this and FOR SURE make it 10x times better. Thanks for reading! ♥

# 🎮 Game Searcher - (Using the IGDB API)

The idea of the project principally relies on getting information about the games via user's input.
The code is not perfect and kinda clumsy since it's my first react project.

## ℹ Installation

Install it with the pack manager [npm](https://www.npmjs.com/).

```bash
  npm i Web-Search-Games
  cd Web-Search-Games
```

Or if you use [pnpm](https://pnpm.io/).

```bash
  pnpm i Web-Search-Games
  cd Web-Search-Games
```

## 🔨 Setting it up

1. Create a .env file in the root of the project.

<p align="center">
  <img src="https://github.com/user-attachments/assets/ab974cd6-911f-451b-bf71-35df09f54cf3" />
</p>

2. Then, go to [TwitchDevelopers](https://dev.twitch.tv/) and log-in with your twitch account and go to your **console** and click on **"_Register your application_"**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/48a2068e-ecc1-481b-b5d0-48f51252709f" height="450px"/>
</p>

3. Once there, do the next steps:

- Add the route, that the project will be hosted on (default is **localhost:5173**) in OathVerification

- Copy your clientID

- Generate a new clientSecret (**DO NOT SHARE!!**)

<p align="center"maxHeight="200px">
  <img src="https://github.com/user-attachments/assets/1e90e128-5284-4d58-b8f4-dbad7b439cc4"  height="550px"/>
</p>

4. And lastly, in the previous .env file created, create the next variables:

- VITE_CLIENT_ID=yourClientId
- VITE_CLIENT_SECRET=yourClientSecret

<p align="center" maxHeight="200px">
  <img src="https://github.com/user-attachments/assets/f0101826-774f-4e2d-9487-549c2b24d8d6"/>
</p>

5. And for the last step, just do a simple:

```bash
  npm install
  npm run dev
```

## ⭐ Next Features?

You could check them on my **[Notion!](https://www.notion.so/AppGames-c345a6b04c144287964fc2120da09f21#de0ac4e98762400ab2b65ef151f37c6b)**

Here's a preview of what im thinking to do!:

<p align="center">
  <img src="https://github.com/user-attachments/assets/3eed1e1e-63a8-4710-a551-187cab8e4165"  height="450px"/>
</p>

## 🗣 Feedback

If you have any feedback, please reach me out on Discord!

<p align="center">
  <a><img src="https://img.shields.io/badge/aragon2004-Username?style=for-the-badge&logo=discord&label=Discord&color=%235865F2"></a>
</p>

## ✉ Commits information

- ⚔️/🔰 > Initial Commit

- 👷 > Branch Bugfix

**Updates:**

    - 🚀 > Mayor update
    - 🔨 > Minor update
    - 🌟 > New funcionality
