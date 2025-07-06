# 🌍 EcoScan - Clothing Carbon Footprint Scanner

## 🔧 Tech Stack

- **Frontend and Backend**: Next.js
- **Image Recognition**: Mock function (tried to use google vision API, but it needs a billing account to be setup.
  Tried some other free API called Imagga, but did not recognize objects correctly.)

This project is built completely in `Next.js 15`. The src folder contains all the relevant code structured properly
under different folders. The `app/components` folder and `page.tsx` files represent the frontend code and backend code
resides under the `app/api` folder. The `constants.ts` file under `app/lib` foler contains all the mock data and
assumptions I have used for the application. For image recognition, I was not able to find any free and reliable APIs so
I have used a mock funtion that, from an array or arrays of clothing items, it randomly chooses any one array element to
display information about clothing items. I tried using an image recognition API but it was not recognizing appropriate
clothing items; you can check the commented out code under `app/api/analyze.route.ts` where I tried to do that. You can
also find the array for carbon score estimation as well as mock offers in the `constants.ts` file.

The `app/api` folder contains three folders, each with their `route.ts` file which corresponds to the three API
endpoints required.

1. The `app/api/analyze/route.ts` file contains the POST request function which accepts an image and returns the
   clothing items identified, count of each item as well as their carbon footprint.
2. The `app/api/calculateScore/route.ts` contains a POST request function that, based on the carbon footprint and number
   of clothing items identified, calculates the total carbon score and eco-reward points. I have used a simple assumed
   logic for eco-reward points calculation tha can be changed easily as required.
3. The `app/api/offers/route.ts` file contains a POST request function that simply returns a list of offers available
   which are less than or equal to the eco-reward points calculated.

There are two pages in the application:

1. `/` - A home page that acts a basic landing page with some details about EcoScan and section to either upload an
   image from device or capture an image using camera.
2. `/results` - A results page where all the relevant information such as the image, clothing items identified, carbon
   footprint, total carbon score, eco-reward points and offers are displayed.

For storage, I have used **Context API** and **localstorage** since a database was not required. You can find the code
and logic for the same in `app/context/ClothesContext.tsx` file. I am storing the image and the list of clothing items
identified, their count and carbon footprint of each item in the global context state and localstorage. In the results
page, I am accessing that information to fetch results for total carbon score, eco-reward points and offers.

# 🚀 Setup Instructions

1. First, clone the github repository into your workspace folder and then go into that folder.

```bash
git clone [REPO_URL]
cd ecoscan
```

2. Next, install all the dependencies using the command below.

```bash
npm i
```

3. All done! Now simply run the application by running the following command

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### For production setup

To create a production setup instead of running the application in development mode for fast and smooth operation of the
application, run the following commands after cloning the repository and installing the dependencies.

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌱 Carbon Score Assumptions

To calculate the environmental impact of each clothing item, we have assigned approximate carbon scores based on item
type. These scores are stored in an in-memory dictionary for quick access.

| 👕 Item | 🌍 Estimated Carbon Footprint (kg CO₂) |
| ------- | -------------------------------------- |
| shirt   | 10                                     |
| pants   | 15                                     |
| jacket  | 20                                     |
| dress   | 25                                     |
| skirt   | 18                                     |
| sweater | 22                                     |
| shorts  | 12                                     |
| blouse  | 14                                     |
| coat    | 30                                     |
| hoodie  | 28                                     |
| suit    | 35                                     |
| jeans   | 16                                     |

## 🌟 Enhancements Proposal

### 📈 Backend Scalability

- Refactor the backend into microservices (e.g., user auth, carbon scoring, image processing) using tools like Docker
  and Kubernetes for better scalability and fault isolation.

- Deploy the backend on platforms like AWS ECS/EKS, Google Cloud Run, or Vercel/Netlify functions, with autoscaling and
  horizontal load balancing enabled.

- Use PostgreSQL or MongoDB Atlas with replication, sharding, and proper indexing. Integrate Redis for caching frequent
  queries. Store media files in a faster database like Firebase and other information in a no-SQL database.

### 🌱 Carbon Scoring Model Improvements

- Train a predictive model (e.g., Random Forest or Gradient Boosting) using labeled datasets to estimate carbon scores
  more accurately based on product features.

- Integrate product life-cycle stages including manufacturing, shipping, packaging, and end-of-life data.

- More information about clothing items like fabric used, brand, manufacturer etc. to accurately calculate carbon
  footprint.

### ✨ Enhanced User Experience and Insights

- Let users compare their scanned item with similar products and offer “greener alternatives”.

- Track cumulative carbon savings, weekly trends, and achievements (gamification).

- Show carbon impact using interactive graphs (e.g., “You saved emissions equal to X km driven by a car”).

### 🌐 Integration with External APIs for Real-Time Data

- Pull real-time emissions factors from APIs

- Use external barcode lookup APIs to autofill product info from a scan.

- Connect with APIs for real-time product metadata and sustainability ratings.

## 📲 Deployment

Below is the deployed URL of the application. I have used `Vercel` for this purpose.

## 📽️ Video

Below is a drive link that represents a video that showcases a working demo of the application along with brief
explanation of some code modules.
