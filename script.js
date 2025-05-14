// Designer Calculator - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all calculators
    initGoldenRatio();
    initModularScale();
    initAspectRatio();
    initSpacingGrid();
    initUnitConverter();
    initContrastChecker();
    initTabNavigation();
    initCopyButtons();
    initMobileMenu(); // Add mobile hamburger menu
    
    // Set Golden Ratio as the default active tab
    const goldenRatioTab = document.querySelector('.tab-btn[data-tab="golden-ratio"]');
    if (goldenRatioTab) {
        // Trigger a click on the Golden Ratio tab
        goldenRatioTab.click();
    }
});

// Tab Navigation
function initTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const calculators = document.querySelectorAll('.calculator');
    const tabContainer = document.querySelector('.tabs');
    if (!tabs.length || !calculators.length || !tabContainer) return;
    
    // Create dropdown for mobile
    const tabsDropdown = document.createElement('div');
    tabsDropdown.className = 'tabs-dropdown';
    
    const dropdownBtn = document.createElement('button');
    dropdownBtn.className = 'tabs-dropdown-btn';
    dropdownBtn.textContent = 'Golden Ratio'; // Default active tab
    
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'tabs-dropdown-content';
    
    tabsDropdown.appendChild(dropdownBtn);
    tabsDropdown.appendChild(dropdownContent);
    
    // Insert dropdown before tabs
    tabContainer.parentNode.insertBefore(tabsDropdown, tabContainer);
    
    // Create dropdown items
    tabs.forEach((tab, index) => {
        const dropdownItem = document.createElement('button');
        dropdownItem.className = 'tabs-dropdown-item';
        dropdownItem.textContent = tab.textContent;
        dropdownItem.dataset.tab = tab.dataset.tab;
        
        if (index === 0) {
            dropdownItem.classList.add('active');
        }
        
        dropdownItem.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabs[index].classList.add('active');
            tabs[index].setAttribute('aria-selected', 'true');
            
            // Update dropdown items
            document.querySelectorAll('.tabs-dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            dropdownItem.classList.add('active');
            
            // Update dropdown button text
            dropdownBtn.textContent = tab.textContent;
            
            // Update active calculator
            calculators.forEach(calc => calc.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            // Update tab indicator
            tabContainer.dataset.activeTab = index;
            
            // Close dropdown
            tabsDropdown.classList.remove('open');
        });
        
        dropdownContent.appendChild(dropdownItem);
    });
    
    // Toggle dropdown
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tabsDropdown.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!tabsDropdown.contains(e.target)) {
            tabsDropdown.classList.remove('open');
        }
    });
    
    // Tab click handler
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            // Update dropdown items
            document.querySelectorAll('.tabs-dropdown-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            
            // Update dropdown button text
            dropdownBtn.textContent = tab.textContent;
            
            // Update active calculator
            calculators.forEach(calc => calc.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            // Update tab indicator
            tabContainer.dataset.activeTab = index;
        });
    });
}

// Mobile Hamburger Menu
function initMobileMenu() {
    // Create hamburger menu
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<div class="hamburger-icon"></div>';
    document.body.appendChild(hamburgerMenu);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    document.body.appendChild(mobileMenu);
    
    // Get tabs and calculators
    const tabs = document.querySelectorAll('.tab-btn');
    const calculators = document.querySelectorAll('.calculator');
    const tabContainer = document.querySelector('.tabs');
    if (!tabs.length || !calculators.length || !tabContainer) return;
    
    // Create mobile menu items
    tabs.forEach((tab, index) => {
        const menuItem = document.createElement('button');
        menuItem.className = 'mobile-menu-item';
        menuItem.textContent = tab.textContent;
        menuItem.dataset.tab = tab.dataset.tab;
        
        if (index === 0) {
            menuItem.classList.add('active');
        }
        
        menuItem.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tabs[index].classList.add('active');
            
            // Update mobile menu items
            document.querySelectorAll('.mobile-menu-item').forEach(item => {
                item.classList.remove('active');
            });
            menuItem.classList.add('active');
            
            // Update active calculator
            calculators.forEach(calc => calc.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            // Update tab indicator
            tabContainer.dataset.activeTab = index;
            
            // Close mobile menu
            hamburgerMenu.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
        
        mobileMenu.appendChild(menuItem);
    });
    
    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });
}

// Copy Buttons
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copy;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Create a temporary textarea to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = targetElement.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    // Execute copy command and show feedback
                    document.execCommand('copy');
                    
                    // Visual feedback
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    btn.classList.add('copied');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                        btn.classList.remove('copied');
                    }, 1500);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        });
    });
}

// Golden Ratio Calculator
function initGoldenRatio() {
    const input = document.getElementById('golden-ratio-input');
    const largerOutput = document.getElementById('golden-larger');
    const smallerOutput = document.getElementById('golden-smaller');
    
    const calculateGoldenRatio = () => {
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) return;
        
        const larger = value * 1.618;
        const smaller = value / 1.618;
        
        largerOutput.textContent = larger.toFixed(1);
        smallerOutput.textContent = smaller.toFixed(1);
    };
    
    input.addEventListener('input', calculateGoldenRatio);
    calculateGoldenRatio();
}

// Modular Scale Calculator
function initModularScale() {
    const baseSize = document.getElementById('base-size');
    const scaleRatio = document.getElementById('scale-ratio');
    const downloadBtn = document.getElementById('download-scale');
    
    const calculateScale = () => {
        const base = parseFloat(baseSize.value);
        const ratio = parseFloat(scaleRatio.value);
        
        if (isNaN(base) || isNaN(ratio) || base <= 0 || ratio <= 0) return;
        
        // Calculate sizes for h1-h6
        const h1 = base * Math.pow(ratio, 3);
        const h2 = base * Math.pow(ratio, 2);
        const h3 = base * ratio;
        const h4 = base;
        const h5 = base / ratio;
        const h6 = base / Math.pow(ratio, 2);
        
        // Update display
        document.getElementById('h1-size').textContent = `${h1.toFixed(2)}px (${(h1/16).toFixed(2)}rem)`;
        document.getElementById('h2-size').textContent = `${h2.toFixed(2)}px (${(h2/16).toFixed(2)}rem)`;
        document.getElementById('h3-size').textContent = `${h3.toFixed(2)}px (${(h3/16).toFixed(2)}rem)`;
        document.getElementById('h4-size').textContent = `${h4.toFixed(2)}px (${(h4/16).toFixed(2)}rem)`;
        document.getElementById('h5-size').textContent = `${h5.toFixed(2)}px (${(h5/16).toFixed(2)}rem)`;
        document.getElementById('h6-size').textContent = `${h6.toFixed(2)}px (${(h6/16).toFixed(2)}rem)`;
    };
    
    baseSize.addEventListener('input', calculateScale);
    scaleRatio.addEventListener('change', calculateScale);
    
    // ... existing code ...
    downloadBtn.addEventListener('click', () => {
        const base = parseFloat(baseSize.value);
        const ratio = parseFloat(scaleRatio.value);
        
        if (isNaN(base) || isNaN(ratio) || base <= 0 || ratio <= 0) return;
        
        // Generate CSS variables
        let cssContent = `:root {\n`;
        cssContent += `  --base-font-size: ${base}px;\n`;
        cssContent += `  --scale-ratio: ${ratio};\n`;
        cssContent += `  --h1-size: ${(base * Math.pow(ratio, 3)).toFixed(2)}px;\n`;
        cssContent += `  --h2-size: ${(base * Math.pow(ratio, 2)).toFixed(2)}px;\n`;
        cssContent += `  --h3-size: ${(base * ratio).toFixed(2)}px;\n`;
        cssContent += `  --h4-size: ${base}px;\n`;
        cssContent += `  --h5-size: ${(base / ratio).toFixed(2)}px;\n`;
        cssContent += `  --h6-size: ${(base / Math.pow(ratio, 2)).toFixed(2)}px;\n`;
        cssContent += `}\n\n`;
        
        // Add typography styles
        cssContent += `/* Typography Scale */\n`;
        cssContent += `h1 { font-size: var(--h1-size); }\n`;
        cssContent += `h2 { font-size: var(--h2-size); }\n`;
        cssContent += `h3 { font-size: var(--h3-size); }\n`;
        cssContent += `h4 { font-size: var(--h4-size); }\n`;
        cssContent += `h5 { font-size: var(--h5-size); }\n`;
        cssContent += `h6 { font-size: var(--h6-size); }\n`;
        
        // Create download link
        const blob = new Blob([cssContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'typography-scale.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
// ... existing code ...
    
    calculateScale();
}

// Aspect Ratio Calculator
function initAspectRatio() {
    const ratioPreset = document.getElementById('ratio-preset');
    const ratioWidth = document.getElementById('ratio-width');
    const ratioHeight = document.getElementById('ratio-height');
    const ratioTarget = document.getElementById('ratio-target');
    const ratioValue = document.getElementById('ratio-value');
    const resultWidth = document.getElementById('ratio-result-width');
    const resultHeight = document.getElementById('ratio-result-height');
    const preview = document.getElementById('ratio-preview');
    
    const calculateRatio = () => {
        let width, height;
        
        if (ratioPreset.value === 'custom') {
            width = parseInt(ratioWidth.value);
            height = parseInt(ratioHeight.value);
        } else {
            const [w, h] = ratioPreset.value.split(':');
            width = parseInt(w);
            height = parseInt(h);
        }
        
        const target = ratioTarget.value;
        const value = parseInt(ratioValue.value);
        
        if (isNaN(width) || isNaN(height) || isNaN(value) || width <= 0 || height <= 0 || value <= 0) return;
        
        let calculatedWidth, calculatedHeight;
        
        if (target === 'width') {
            calculatedWidth = value;
            calculatedHeight = Math.round((value / width) * height);
        } else {
            calculatedHeight = value;
            calculatedWidth = Math.round((value / height) * width);
        }
        
        resultWidth.textContent = `${calculatedWidth}px`;
        resultHeight.textContent = `${calculatedHeight}px`;
        
        // Update preview
        const maxPreviewWidth = 300;
        const maxPreviewHeight = 200;
        const scale = Math.min(maxPreviewWidth / calculatedWidth, maxPreviewHeight / calculatedHeight);
        
        const previewWidth = calculatedWidth * scale;
        const previewHeight = calculatedHeight * scale;
        
        preview.style.width = `${previewWidth}px`;
        preview.style.height = `${previewHeight}px`;
    };
    
    ratioPreset.addEventListener('change', () => {
        // Show/hide custom ratio inputs
        const ratioInputs = document.querySelector('.ratio-inputs');
        if (ratioPreset.value === 'custom') {
            ratioInputs.style.display = 'grid';
        } else {
            ratioInputs.style.display = 'none';
        }
        
        calculateRatio();
    });
    
    ratioWidth.addEventListener('input', calculateRatio);
    ratioHeight.addEventListener('input', calculateRatio);
    ratioTarget.addEventListener('change', calculateRatio);
    ratioValue.addEventListener('input', calculateRatio);
    
    // Initialize
    calculateRatio();
    // Hide custom ratio inputs initially
    const ratioInputs = document.querySelector('.ratio-inputs');
    ratioInputs.style.display = 'none';
}

// Spacing/Grid Calculator
function initSpacingGrid() {
    const gridBase = document.getElementById('grid-base');
    const gridColumns = document.getElementById('grid-columns');
    const gridGutter = document.getElementById('grid-gutter');
    const gridGutterValue = document.getElementById('grid-gutter-value');
    const gridBaseResult = document.getElementById('grid-base-result');
    const gridGutterResult = document.getElementById('grid-gutter-result');
    const gridVisual = document.getElementById('grid-visual');
    
    const updateGrid = () => {
        const base = parseInt(gridBase.value);
        const columns = parseInt(gridColumns.value);
        const gutter = parseInt(gridGutter.value);
        
        if (isNaN(base) || isNaN(columns) || isNaN(gutter) || base <= 0 || columns <= 0 || gutter <= 0) return;
        
        const gutterPx = base * gutter;
        
        gridGutterValue.textContent = `${gutter} units (${gutterPx}px)`;
        gridBaseResult.textContent = `${base}px (${base/16}rem)`;
        gridGutterResult.textContent = `${gutterPx}px (${gutterPx/16}rem)`;
        
        // Update visual grid
        gridVisual.innerHTML = '';
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'grid-column';
            column.style.width = `${100 / columns - gutter}%`;
            column.style.marginRight = i < columns - 1 ? `${gutter}%` : '0';
            gridVisual.appendChild(column);
        }
    };
    
    gridBase.addEventListener('input', updateGrid);
    gridColumns.addEventListener('input', updateGrid);
    gridGutter.addEventListener('input', updateGrid);
    
    updateGrid();
}

// Unit Converter
function initUnitConverter() {
    const baseFontSize = document.getElementById('base-font-size');
    const pxValue = document.getElementById('px-value');
    const remResult = document.getElementById('rem-result');
    const emResult = document.getElementById('em-result');
    const ptResult = document.getElementById('pt-result');
    const perResult = document.getElementById('per-result');
    
    const convertUnits = () => {
        const base = parseFloat(baseFontSize.value);
        const px = parseFloat(pxValue.value);
        
        if (isNaN(base) || isNaN(px) || base <= 0) return;
        
        const rem = px / base;
        const em = px / base;
        const pt = px * 0.75;
        const per = (px / base) * 100;
        
        remResult.textContent = `${rem.toFixed(3)}rem`;
        emResult.textContent = `${em.toFixed(3)}em`;
        ptResult.textContent = `${pt.toFixed(2)}pt`;
        perResult.textContent = `${per.toFixed(2)}%`;
    };
    
    baseFontSize.addEventListener('input', convertUnits);
    pxValue.addEventListener('input', convertUnits);
    
    convertUnits();
}

// Contrast Checker
function initContrastChecker() {
    const textColor = document.getElementById('text-color');
    const bgColor = document.getElementById('bg-color');
    const textColorSwatch = document.getElementById('text-color-swatch');
    const bgColorSwatch = document.getElementById('bg-color-swatch');
    const textColorValue = document.getElementById('text-color-value');
    const bgColorValue = document.getElementById('bg-color-value');
    const contrastSample = document.getElementById('contrast-sample');
    const contrastRatioValue = document.getElementById('contrast-ratio-value');
    const wcagAA = document.getElementById('wcag-aa');
    const wcagAAA = document.getElementById('wcag-aaa');
    
    textColor.addEventListener('input', () => {
        textColorValue.textContent = textColor.value.toUpperCase();
        textColorSwatch.style.backgroundColor = textColor.value;
        updateContrast();
    });
    
    bgColor.addEventListener('input', () => {
        bgColorValue.textContent = bgColor.value.toUpperCase();
        bgColorSwatch.style.backgroundColor = bgColor.value;
        updateContrast();
    });
    
    function updateContrast() {
        // Update preview - Fix: Apply colors to the correct elements
        const sampleText = contrastSample.querySelector('.contrast-sample-text');
        
        // Apply text color to all text elements in the sample
        sampleText.style.color = textColor.value;
        
        // Apply background color to the container
        contrastSample.style.backgroundColor = bgColor.value;
        
        // Calculate contrast ratio
        const ratio = getContrastRatio(textColor.value, bgColor.value);
        
        // Update outputs
        contrastRatioValue.textContent = `${ratio.toFixed(2)}:1`;
        
        // WCAG 2.1 compliance
        // AA requires 4.5:1 for normal text, 3:1 for large text
        // AAA requires 7:1 for normal text, 4.5:1 for large text
        wcagAA.textContent = ratio >= 4.5 ? 'Pass' : 'Fail';
        wcagAAA.textContent = ratio >= 7 ? 'Pass' : 'Fail';
        
        // Add color indicators
        wcagAA.className = ratio >= 4.5 ? 'pass' : 'fail';
        wcagAAA.className = ratio >= 7 ? 'pass' : 'fail';
    }
    
    // Initialize swatches
    textColorSwatch.style.backgroundColor = textColor.value;
    bgColorSwatch.style.backgroundColor = bgColor.value;
    
    // Initial calculation
    updateContrast();
}

// Helper function to calculate contrast ratio
function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

// Helper function to calculate relative luminance
function getLuminance(hexColor) {
    // Convert hex to RGB
    let r = parseInt(hexColor.substr(1, 2), 16) / 255;
    let g = parseInt(hexColor.substr(3, 2), 16) / 255;
    let b = parseInt(hexColor.substr(5, 2), 16) / 255;
    
    // Apply gamma correction
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}