# YuccaInfo GED Frontend

### Challenge Name: Développer une version innovante d’un système GED (Gestion Electronique de Documents) intelligent, orienté data science



### Preview: 
![image](https://github.com/user-attachments/assets/02b9584f-9020-4712-91c6-3efe4069b531)![image](https://github.com/user-attachments/assets/dfc8ac6f-8dd1-46dd-b84e-e61465e061b0)
![image](https://github.com/user-attachments/assets/487a272a-dcbb-4001-9c4e-bdb88a3595d0)![image](https://github.com/user-attachments/assets/88d41df0-3b31-4a97-85d3-387740f02747)





A modern document management system built with Next.js and TypeScript.

## Overview

This project is a frontend application for managing, viewing, and organizing documents. It features a responsive interface that adapts to desktop and mobile devices, providing an intuitive document browsing experience with detailed document information.

## Features

- **Document Management**: View, search, and organize your documents
- **Responsive Design**: Optimized for both desktop and mobile viewing experiences
- **Document Details**: View comprehensive information about each document
- **Document Types**: Support for various document types with custom icons
- **Download Management**: Easy access to download documents
- **Category Organization**: Documents organized by categories

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone [<repository-url>](https://github.com/Jojoussef/yuccainfo_ged_frontend/)
   cd yuccainfo_ged_frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using Docker

```bash
# Build the Docker image
docker build -t yuccainfo-ged-frontend .

# Run the container
docker run -p 3000:3000 yuccainfo-ged-frontend
```

For Bun runtime:
```bash
docker build -f Dockerfile.bun -t yuccainfo-ged-frontend-bun .
docker run -p 3000:3000 yuccainfo-ged-frontend-bun
```

## Project Structure

```
/
├── src/                    # Source files
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── .next/                  # Next.js build output
└── ...config files         # Various configuration files
```

## Key Components

### Document Table

The Document Table component (`src/components/document-table.tsx`) displays documents in a tabular format on desktop and card format on mobile. Features include:

- Document type indicators with custom icons
- Truncated text previews
- Formatted dates
- View document details
- Download documents

## Development

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Deployment

The application can be deployed to various platforms:

### Vercel

```bash
npm run build
vercel deploy
```

### Custom Server (using Docker)

Build and deploy the Docker image to your server of choice.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License


Copyright © 2025 Youssef Benatti. All rights reserved.

This software and associated documentation files are the exclusive property of Youssef Benatti. All rights, title, and interest in and to this software belong solely to Youssef Benatti.

No part of this software may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of Youssef Benatti.
