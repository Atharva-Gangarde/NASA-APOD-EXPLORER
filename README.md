# NASA APOD Explorer

NASA APOD Explorer is a web application that allows users to explore NASA's Astronomy Picture of the Day (APOD). The application consists of a **Node.js backend** serving a RESTful API and a **React frontend** that displays APOD images, details, and historical data.  

This project was developed as part of an assessment and demonstrates best practices in REST APIs, caching, and responsive UI design.


## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Backend](#backend)  
- [Frontend](#frontend)  
- [API Usage](#api-usage)  
- [Folder Structure](#folder-structure)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)  

---

## Features

- Display today's APOD  
- Browse past APODs using a date picker  
- Gallery view of recent APODs  
- Detailed view for each image including title, explanation, and copyright  
- Caching of API responses to improve performance  
- Fully responsive UI  

---

## Tech Stack

**Backend:**  
- Node.js  
- Express.js  
- Axios  
- Node-Cache (for caching API responses)  
- Dotenv (for environment variables)  

**Frontend:**  
- React.js  
- JavaScript / JSX  
- CSS / Responsive design  
- Axios (for API requests)  

**Other Tools:**  
- Git & GitHub  
- NASA Open API  



## Getting Started

### Prerequisites

- Node.js v18+  
- npm v9+  
- NASA API Key ([Get it here](https://api.nasa.gov/))  



### Setup Backend

1. Navigate to the backend folder:

bash
cd nasa-backend
