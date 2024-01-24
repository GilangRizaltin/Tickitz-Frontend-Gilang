# Tickitz React JS

<br>
<br>
<div align="center">
  <img src="https://res.cloudinary.com/doncmmfaa/image/upload/v1705476761/samples/Tickitz_1_qjg2bh.png" alt="Logo"  width="340" height="100"/>
</div>
<br>
<br>
Welcome to an immersive cinematic experience! This website is not just a ticket-buying platform; it's your gateway to a world of movies, featuring a mesmerizing lineup of films complete with in-depth details. Dive into the magic of cinema with our primary features, where you can seamlessly book movie tickets based on your preferred time and location. With dual roles – the discerning Consumer and the behind-the-scenes Admin – every user becomes a director of their movie-watching destiny. But that's not all! Take a stroll down memory lane as you explore your booking history, and for that personal touch, users can effortlessly update their profiles, ensuring that every visit to our digital theater is a uniquely tailored experience. Get ready to embark on a cinematic journey like never before, where the show is not just on the big screen but also at your fingertips

## Technologies used in this project

- [Vite React JS](https://vitejs.dev/guide/) \
  A build tool designed for web development, and when paired with React JS, it provides a fast and efficient development environment.

- [Redux](https://react-redux.js.org/introduction/getting-started) \
  A state management library for React applications.

- [React Router](https://reactrouter.com/en/main/start/overview) \
  Library for handling navigation in React applications.

- [Tailwind](https://tailwindcss.com/docs/installation) \
  A utility-first CSS framework that simplifies styling in web development.

- [Axios](https://axios-http.com/docs/intro) \
  A promise-based HTTP client for the browser and Node.js.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
VITE_BACKEND_HOST = "YOUR BACKEND URL"
```

## Run Locally

1. Clone the project

```bash
  $ git clone https://github.com/GilangRizaltin/Tickitz-Frontend-Gilang
```

2. Go to the project directory

```bash
  $ cd Tickitz-Frontend-Gilang
```

3. Install dependencies

```bash
  $ npm install
```

4. Preparing backend \
   Don't forget to run the backend of this project: [Backend Tickitz (Golang)](#backend)

5. Start the server

```bash
  $ npm run dev
```

## Route

| Route                   | Description                  |
| :---------------------- | :--------------------------- |
| `"/"`                   | Home page                    |
| `"/auth/login"`         | Login page                   |
| `"/auth/register"`      | register page                |
| `"/movie/:id"`          | Detail of movie selected     |
| `"/order"`              | Creating an order page       |
| `"/order/payment"`      | Payment page                 |
| `"/order/ticketresult"` | Ticket result page           |
| `"/order/orderhistory"` | History of user's order page |
| `"/profile"`            | User's profile page          |

## Deployment

[Tickitz Front End Deployment](https://tickitz-gilang.netlify.app)

## Screenshots

| Login                                                                                                               | Home                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ![Login Screenshot](https://res.cloudinary.com/doncmmfaa/image/upload/v1705597276/Tickitz/tickitz_login_s4w2xe.png) | ![Home Screenshot](https://res.cloudinary.com/doncmmfaa/image/upload/v1705597281/Tickitz/tickitz_home_bd8al8.png)              |
| Profile                                                                                                             | Order Movie Ticket                                                                                                             |
| ![Profile Screenshot](https://res.cloudinary.com/doncmmfaa/image/upload/v1705597272/Tickitz/profile_wumkla.png)     | ![Order Movie Ticket Screenshot](https://res.cloudinary.com/doncmmfaa/image/upload/v1705597273/Tickitz/order-movie_djvbab.png) |

## Related Project

<a name="backend"></a>
[Backend (Golang)](https://github.com/GilangRizaltin/Tickitz-Golang)

## Collaborator

- [@Ridwan Bahtiar](https://github.com/ridwanbahtiar15)

## Support

For support, email gilangzaltin@gmail.com
