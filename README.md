# Sorting Algorithm Visualizer

A comprehensive, interactive web application that visualizes sorting algorithms with smooth animations and step-by-step demonstrations. Built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Functionality
- **8 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, and Radix Sort
- **Interactive Visualizations**: Real-time animated bars showing the sorting process
- **Step-by-Step Control**: Play, pause, step forward/backward through the sorting process
- **Customizable Speed**: Adjustable animation speed from 1% to 100%
- **Array Input Options**: Generate random arrays or input custom arrays

### Visualization Features
- **Color-Coded States**: Different colors for comparing, swapping, sorted, pivot, and highlighted elements
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Real-time Statistics**: Live comparison and swap counters
- **Progress Tracking**: Visual progress bar showing completion percentage

### Educational Features
- **Algorithm Information Panel**: Detailed information about each algorithm including:
  - Time complexity (Best, Average, Worst case)
  - Space complexity
  - Algorithm properties (Stable/Unstable, In-place/Not in-place)
  - Pseudocode implementation
  - Detailed descriptions

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Action Queue System**: Separates algorithm logic from rendering for smooth animations
- **Keyboard Shortcuts**: Full keyboard navigation support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: JavaScript (JSX)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sorting--algo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Getting Started
1. The app loads with a random array of 20 elements
2. Select a sorting algorithm from the dropdown
3. Use the play button to start the visualization
4. Adjust speed using the slider
5. Use step controls to move through the process manually

### Array Configuration
- **Random Array**: Click "Generate Random Array" to create a new random array
- **Array Size**: Use +/- buttons to adjust array size (5-100 elements)
- **Custom Array**: Click "Show Custom Array Input" and enter comma-separated numbers

### Controls
- **Play/Pause**: Start or pause the visualization
- **Step Forward/Backward**: Move through the sorting process one step at a time
- **Reset**: Clear the current visualization and return to the original array
- **Speed Slider**: Adjust animation speed (1% = slow, 100% = fast)

### Understanding the Visualization
- **Gray Bars**: Default state
- **Blue Bars**: Currently being compared
- **Red Bars**: Currently being swapped
- **Green Bars**: Sorted elements
- **Amber Bars**: Pivot element (Quick Sort)
- **Purple Bars**: Highlighted element (Insertion/Shell Sort)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ArrayVisualizer.jsx    # Main visualization component
│   ├── Controls.jsx           # Playback and algorithm controls
│   ├── AlgorithmInfo.jsx      # Algorithm information panel
│   └── ArrayInput.jsx         # Array configuration component
├── hooks/
│   └── useSortingVisualizer.js # Custom hook for state management
├── utils/
│   └── sortingAlgorithms.js   # Algorithm implementations and metadata
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles and Tailwind imports
```

## 🔧 Customization

### Adding New Algorithms
1. Implement the algorithm in `src/utils/sortingAlgorithms.js`
2. Add algorithm metadata to the `ALGORITHMS` object
3. Add the algorithm function to the `SORTING_FUNCTIONS` object in the hook

### Modifying Animations
- Edit `src/components/ArrayVisualizer.jsx` to change animation properties
- Modify Framer Motion configurations for different animation styles
- Adjust color schemes in the `getBarColor` function

### Styling Changes
- Modify `src/index.css` for global style changes
- Update Tailwind classes in components for specific styling
- Customize the color palette in `tailwind.config.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
The project is configured for easy deployment to Vercel or Netlify. Simply connect your repository and deploy.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by various sorting algorithm visualizers
- Built with modern web technologies for educational purposes
- Designed to help students and developers understand sorting algorithms

## 📊 Performance Notes

- The visualizer is optimized for arrays up to 100 elements
- Larger arrays may cause performance issues due to animation complexity
- All algorithms are implemented with proper action queuing for smooth animations
- The application uses React's optimization features for efficient re-rendering

---

**Happy Sorting! 🎉** 