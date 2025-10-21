# WEB103 Project 4 - SoleMate

Submitted by: Vitaliy Prymak

About this web app: **SoleMate is a custom sneaker personalization web application that allows users to design their own sneakers by selecting different colors for the sole, upper, laces, and logo. Users can create, view, edit, and delete their custom sneaker designs with real-time price updates and visual feedback.**

Time spent: **2** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.
- [x] **Users can view **multiple** features of the `CustomItem` (sneaker) they can customize, (sole color, upper color, laces color, logo color)**
- [x] **Each customizable feature has multiple options to choose from (e.g. sole color could be white, black, red, blue, green, yellow)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (sneaker) changes dynamically as different options are selected _OR_ The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] **Beautiful animated background with floating sneaker emojis**
- [x] **Real-time price calculation with visual price updates**
- [x] **Color preview cards for each customization option**
- [x] **Responsive design with modern UI/UX**
- [x] **CORS-enabled API for seamless frontend-backend communication**
- [x] **Comprehensive error handling and validation**
- [x] **Database connection with SSL support for production deployment**

## Video Walkthrough

Here's a walkthrough of implemented required features:


    
Loom Message - 21 October 2025 - Watch Video

<div>
    <a href="https://www.loom.com/share/e32f53e4d22a49a6b581ca58f45549be">
      <p>Loom Message - 21 October 2025 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/e32f53e4d22a49a6b581ca58f45549be">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/e32f53e4d22a49a6b581ca58f45549be-e73d8e733336e4ed-full-play.gif">
    </a>
  </div>
 



GIF created with ... GIF tool here


## Database Screenshots

### Render Dashboard



### Database Tables

```sql
-- Sneakers table
SELECT * FROM sneakers;

-- Option types table
SELECT * FROM option_types;

-- Sneaker options table
SELECT * FROM sneaker_options;
```

## Technical Implementation

### Database Schema

- **sneakers**: Stores custom sneaker designs with pricing
- **option_types**: Defines customization categories (sole, upper, laces, logo)
- **sneaker_options**: Contains all available color options with pricing

### API Endpoints

- `GET /api/sneakers` - Retrieve all sneakers
- `POST /api/sneakers` - Create new sneaker
- `GET /api/sneakers/:id` - Get specific sneaker
- `PUT /api/sneakers/:id` - Update sneaker
- `DELETE /api/sneakers/:id` - Delete sneaker
- `GET /api/options` - Get all customization options

### Key Features

1. **Dynamic Pricing**: Real-time price calculation based on selected options
2. **Visual Feedback**: Color preview cards for each option
3. **Form Validation**: Prevents invalid combinations
4. **CRUD Operations**: Full create, read, update, delete functionality
5. **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables** in `.env`
4. **Start the development server**: `npm run dev`
5. **Access the application**: `http://localhost:5175`

## Notes

### Challenges Encountered

1. **Database Connection**: Initial SSL configuration issues with Render PostgreSQL
2. **CORS Configuration**: Required proper CORS setup for frontend-backend communication
3. **Price Calculation**: Fixed SQL parameter binding issues in price calculation queries
4. **Type Conversion**: Handled string-to-number conversion for price formatting

### Technical Solutions

- Implemented proper SSL configuration for production database
- Added CORS middleware for cross-origin requests
- Fixed SQL parameter indexing in price calculation queries
- Added parseFloat() for proper price formatting

### Future Enhancements

- Add more customization options (materials, patterns)
- Implement user authentication
- Add sneaker size selection
- Include 3D visualization
- Add social sharing features

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
