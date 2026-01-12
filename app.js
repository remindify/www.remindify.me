// Mock Backend APIs
const api = {
    getWeather: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            time: "07:00AM | Mon | 5 Jan, 2025",
            banner: "Good Morning! It's 15°C outside with 34% relative humidity.",
            today: {
                warnings: ["Cold Weather Warning", "Red"]
            },
            tomorrow: {
                temp: "11 - 18°C",
                humidity: "25 - 55%",
                desc: "Fine. Cold in the morning. Very dry during the day.",
                rainChance: "Low"
            },
            dayAfterTomorrow: {
                temp: "12 - 19°C",
                humidity: "35 - 65%",
                desc: "Fine. Cold in the morning. Very dry during the day.",
                rainChance: "Low"
            },
            summary: "A winter monsoon is bringing dry weather to Guangdong's coast, with humidity below 40% by noon. Expect fine and cold mornings, with temperatures rising slightly over the weekend, despite remaining cool. A windy easterly airstream is forecast for early next week, affecting southern China's coast."
        };
    },
    getEDB: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            time: "07:00AM | Mon | 5 Jan, 2025",
            today: {
                warnings: ["Cold Weather Warning", "Red"]
            },
            tomorrow: {
                temp: "11 - 18°C",
                humidity: "25 - 55%",
                desc: "Fine. Cold in the morning. Very dry during the day.",
                rainChance: "Low"
            },
            dayAfterTomorrow: {
                temp: "12 - 19°C",
                humidity: "35 - 65%",
                desc: "Fine. Cold in the morning. Very dry during the day.",
                rainChance: "Low"
            }
        };
    },
    getAirQuality: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            time: "07:00AM | Mon | 5 Jan, 2025",
            locations: [
                { name: "Causeway Bay, HongKong (銅鑼灣)", value: 88 },
                { name: "Sham Shui Po, HongKong (深水埗)", value: 83 },
                { name: "North Point, HongKong (北角)", value: 120 },
                { name: "Southern, HongKong (南區)", value: 93 },
                { name: "HongKong (香港)", value: 95 },
                { name: "Sha Tin, HongKong (沙田)", value: 83 },
                { name: "Central, HongKong (中環)", value: 95 },
                { name: "Tung Chung, HongKong (東涌)", value: 84 },
                { name: "Yuen Long, HongKong (元朗)", value: 95 },
                { name: "Kwun Tong, HongKong (觀塘)", value: 83 },
                { name: "Kwai Chung, HongKong (葵涌)", value: 85 },
                { name: "Tuen Mun, HongKong (屯門)", value: 97 }
            ]
        };
    }
};

// UI Controller
const UI = {
    contentArea: document.getElementById('content-area'),
    tabs: document.querySelectorAll('.tab-btn'),

    init: function() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.id.replace('tab-', '');
                this.switchTab(tabId);
            });
        });

        // Default tab
        this.switchTab('weather');
    },

    switchTab: async function(tabId) {
        // Update tab UI
        this.tabs.forEach(tab => {
            if (tab.id === `tab-${tabId}`) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show loading
        this.contentArea.innerHTML = `
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        `;

        // Fetch and Render
        try {
            if (tabId === 'weather') {
                const data = await api.getWeather();
                this.renderWeather(data);
            } else if (tabId === 'edb') {
                const data = await api.getEDB();
                this.renderEDB(data);
            } else if (tabId === 'air-quality') {
                const data = await api.getAirQuality();
                this.renderAirQuality(data);
            }
        } catch (error) {
            this.contentArea.innerHTML = `<div class="text-red-500">Error loading data.</div>`;
        }
    },

    renderWeather: function(data) {
        this.contentArea.innerHTML = `
            <div class="alert-banner flex items-center gap-3">
                <span class="text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
                <span class="text-gray-700 font-medium">${data.banner}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-2 card">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Weather (${data.time})</h2>
                    
                    <div class="space-y-6 text-gray-600">
                        <div>
                            <p class="font-semibold text-gray-800 mb-1">Today's weather warning:</p>
                            <ul class="list-disc list-inside">
                                ${data.today.warnings.map(w => `<li>- ${w}</li>`).join('')}
                            </ul>
                        </div>

                        <div>
                            <p class="font-semibold text-gray-800 mb-1">Tomorrow:</p>
                            <p>${data.tomorrow.temp}</p>
                            <p>${data.tomorrow.humidity}</p>
                            <p>${data.tomorrow.desc}</p>
                            <p>Chance of rain: ${data.tomorrow.rainChance}</p>
                        </div>

                        <div>
                            <p class="font-semibold text-gray-800 mb-1">The Day after Tomorrow:</p>
                            <p>${data.dayAfterTomorrow.temp}</p>
                            <p>${data.dayAfterTomorrow.humidity}</p>
                            <p>${data.dayAfterTomorrow.desc}</p>
                            <p>Chance of rain: ${data.dayAfterTomorrow.rainChance}</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Summary</h2>
                    <p class="text-gray-600 leading-relaxed">${data.summary}</p>
                </div>
            </div>
        `;
    },

    renderEDB: function(data) {
        this.contentArea.innerHTML = `
            <div class="max-w-2xl mx-left card">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">EDB Alert (${data.time})</h2>
                
                <div class="space-y-6 text-gray-600">
                    <div>
                        <p class="font-semibold text-gray-800 mb-1">Today's weather warning:</p>
                        <ul class="list-disc list-inside">
                            ${data.today.warnings.map(w => `<li>- ${w}</li>`).join('')}
                        </ul>
                    </div>

                    <div>
                        <p class="font-semibold text-gray-800 mb-1">Tomorrow:</p>
                        <p>${data.tomorrow.temp}</p>
                        <p>${data.tomorrow.humidity}</p>
                        <p>${data.tomorrow.desc}</p>
                        <p>Chance of rain: ${data.tomorrow.rainChance}</p>
                    </div>

                    <div>
                        <p class="font-semibold text-gray-800 mb-1">The Day after Tomorrow:</p>
                        <p>${data.dayAfterTomorrow.temp}</p>
                        <p>${data.dayAfterTomorrow.humidity}</p>
                        <p>${data.dayAfterTomorrow.desc}</p>
                        <p>Chance of rain: ${data.dayAfterTomorrow.rainChance}</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderAirQuality: function(data) {
        this.contentArea.innerHTML = `
            <div class="max-w-2xl mx-left card">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    Air Quality Alert<span class="text-xs font-normal ml-1">⌄</span>: (${data.time})
                </h2>
                
                <div class="space-y-1 text-gray-600">
                    ${data.locations.map(loc => `
                        <p>- ${loc.name}: <span class="text-gray-800">${loc.value}</span></p>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
