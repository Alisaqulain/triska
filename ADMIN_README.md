# Trisaka Admin Panel

Complete admin panel for managing the Trisaka e-commerce website.

## Admin Access

### Default Credentials
- **Email:** `admin@trisaka.com`
- **Password:** `admin123`

⚠️ **Important:** Change the default password in production! Update it in `lib/auth.js`

## Admin Features

### 1. Dashboard (`/admin/dashboard`)
- Overview statistics (Total Products, Orders, Revenue)
- Quick action buttons
- Real-time data visualization

### 2. Products Management (`/admin/products`)
- View all products in a table
- Add new products
- Edit existing products
- Delete products
- View product details (stock, price, category)

**Add Product:**
- Navigate to `/admin/products/new`
- Fill in product details:
  - Name, Category, Age Group
  - Price, Original Price (for discounts)
  - Stock quantity
  - Image URL
  - Fabric type, Occasion
  - Description

**Edit Product:**
- Click "Edit" button on any product
- Modify fields and save

### 3. Orders Management (`/admin/orders`)
- View all customer orders
- Update order status:
  - Pending
  - Processing
  - Shipped
  - Completed
  - Cancelled
- View order details (customer, items, total)

### 4. Settings (`/admin/settings`)
- Configure site settings
- Site name and email
- Maintenance mode toggle
- Admin account information

## File Structure

```
app/admin/
├── login/          # Admin login page
├── dashboard/      # Dashboard overview
├── products/       # Product management
│   ├── page.js     # Products list
│   ├── new/        # Add new product
│   └── edit/[id]/  # Edit product
├── orders/         # Orders management
└── settings/       # Site settings

lib/
├── auth.js         # Authentication utilities
└── storage.js      # Local storage (products & orders)

contexts/
└── AdminContext.jsx  # Admin state management
```

## How It Works

### Authentication
- Uses localStorage for session management
- Protected routes check authentication
- Auto-redirect to login if not authenticated

### Data Storage
- Currently uses browser localStorage
- In production, replace with API calls to backend
- All storage functions in `lib/storage.js`

### Product Management
- Products stored in localStorage key: `trisaka_products`
- Supports full CRUD operations
- Products sync with frontend automatically

### Order Management
- Orders stored in localStorage key: `trisaka_orders`
- Status can be updated by admin
- Orders appear when customers make purchases

## Production Setup

1. **Change Admin Password:**
   ```javascript
   // lib/auth.js
   const ADMIN_PASSWORD = 'your-secure-password'
   ```

2. **Replace LocalStorage with Backend:**
   - Update `lib/storage.js` to make API calls
   - Connect to your database
   - Implement proper authentication

3. **Add Environment Variables:**
   ```env
   ADMIN_EMAIL=admin@trisaka.com
   ADMIN_PASSWORD=secure-password
   DATABASE_URL=your-database-url
   ```

4. **Security:**
   - Use JWT tokens for authentication
   - Implement rate limiting
   - Add CSRF protection
   - Use HTTPS in production

## Navigation

Access admin panel at: `/admin/login`

After login, navigate through:
- Dashboard: `/admin/dashboard`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Settings: `/admin/settings`

## Features Overview

✅ Admin authentication
✅ Protected routes
✅ Product CRUD operations
✅ Order management
✅ Dashboard with statistics
✅ Settings page
✅ Responsive design
✅ Beautiful UI matching main site

## Next Steps

1. Connect to real database
2. Add user management
3. Add analytics and reports
4. Add email notifications
5. Add inventory management
6. Add discount/coupon management
7. Add customer management



