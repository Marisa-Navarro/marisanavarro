#!/bin/bash

# Hairdresser Portfolio Deployment Script for Netlify

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Netlify (requires netlify-cli)
    echo "🌐 Deploying to Netlify..."
    
    # Uncomment the line below if you have netlify-cli installed
    # netlify deploy --prod --dir=out
    
    echo "📁 Static files generated in 'out' directory"
    echo "💡 To deploy manually:"
    echo "   1. Go to https://netlify.com"
    echo "   2. Drag and drop the 'out' folder"
    echo "   3. Your site will be live!"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 Deployment preparation complete!" 