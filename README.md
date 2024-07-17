
# Node Express Backend Boilerplate

This boilerplate provides a foundation for building a Node.js backend server using Express. It includes user authentication features such as user signup and signin. Additionally, it is designed to seamlessly deploy on Vercel for easy scalability and hosting.

## Highlights

- User signup: Register new users with unique usernames and passwords.
- User signin: Allow registered users to authenticate and access protected resources.
- User referral: User can refer someone and check if user signup by referral.
- User Authentication: Secure routes and endpoints using JWT (JSON Web Tokens) for authentication.
- Vercel deployment: Optimized for deployment on the Vercel platform for seamless hosting and scalability.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building scalable and efficient server-side applications.
- **Express.js**: A minimalist web framework for Node.js, providing a robust set of features for web and mobile applications.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties. It's used for securing routes and endpoints.
- **Vercel**: A cloud platform for static sites and Serverless Functions, providing seamless deployment and scalability.

## Getting Started

1. **Clone the repository**:

   ```
   git clone https://github.com/dapp-sculptor/node-express-boilerplate.git
   ```

2. **Install dependencies**:

   ```
   cd your-project
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory of your project and add the following variables:

   ```
   # JWT token secret key
   JWT_SECRET = 

   # DB CONFIGURATION
   DB_NAME = 
   DB_USERNAME = 
   DB_PASSWORD = 
   DB_HOST = 
   DB_PORT = 

   # PORT
   PORT = 
   ```

4. **Start the server**:

   ```
   npm start
   ```
 
 