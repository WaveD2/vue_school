<template>
  <div class="app">
    <button @click="toggleSettingsPopup">Settings</button>

    <!-- Settings Popup -->
    <div v-if="showSettingsPopup" class="settings-popup">
      <div class="tabs">
        <button :class="{ activeTab: currentTab === 'filter' }" @click="currentTab = 'filter'">
          Filter Settings
        </button>
        <button :class="{ activeTab: currentTab === 'field' }" @click="currentTab = 'field'">
          Field Settings
        </button>
      </div>

      <!-- Filter Settings Tab -->
      <div v-if="currentTab === 'filter'" class="tab-content">
        <h2>Filter Settings</h2>
        <div v-for="(value, key) in filterOptions" :key="key">
          <input type="checkbox" v-model="selectedFilters[key]" />
          <label>{{ key }}</label>
        </div>
        <button @click="saveFilters">Save Filters</button>
      </div>

      <!-- Field Settings Tab -->
      <div v-if="currentTab === 'field'" class="tab-content">
        <h2>Field Settings</h2>
        <div v-for="(value, key) in fieldOptions" :key="key">
          <input type="checkbox" v-model="selectedFields[key]" />
          <label>{{ key }}</label>
        </div>
        <button @click="saveFields">Save Fields</button>
      </div>
    </div>

    <!-- Display Selected Filters and Fields -->
    <div class="selected-items">
      <h3>Selected Filters:</h3>
      <div v-for="(value, key) in selectedFilters" :key="key" @click="removeFilter(key)">
        <span>{{ key }}</span>
      </div>
      <h3>Selected Fields:</h3>
      <div v-for="(value, key) in selectedFields" :key="key" @click="removeField(key)">
        <span>{{ key }}</span>
      </div>
    </div>
  </div>

  <div>
    <h2>User List</h2>

    <table class="user-table">
      <tr>
        <th colspan="2" class="basic-info">Thông tin cơ bản</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>John Doe</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>Male</td>
      </tr>
    </table>

    <table class="user-table">
      <tr>
        <th colspan="2" class="advanced-info">Thông tin nâng cao</th>
      </tr>
      <tr>
        <td>Address</td>
        <td>123 Main St, City</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>123-456-7890</td>
      </tr>
      <tr>
        <td>Nationality</td>
        <td>USA</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSettingsPopup: false,
      currentTab: 'filter',
      filterOptions: {
        Gender: false,
        'Teacher Type': false,
        Status: false
        // Add more filter options here
      },
      fieldOptions: {
        Gender: false,
        'Teacher Type': false,
        Status: false
        // Add more field options here
      },
      selectedFilters: {},
      selectedFields: {}
    }
  },
  methods: {
    toggleSettingsPopup() {
      this.showSettingsPopup = !this.showSettingsPopup
    },
    saveFilters() {
      localStorage.setItem('selectedFilters', JSON.stringify(this.selectedFilters))
    },
    saveFields() {
      localStorage.setItem('selectedFields', JSON.stringify(this.selectedFields))
    },
    removeFilter(key) {
      this.selectedFilters[key] = false
      localStorage.setItem('selectedFilters', JSON.stringify(this.selectedFilters))
    },
    removeField(key) {
      this.selectedFields[key] = false
      localStorage.setItem('selectedFields', JSON.stringify(this.selectedFields))
    }
  },
  mounted() {
    // Load selected filters and fields from localStorage
    const savedFilters = JSON.parse(localStorage.getItem('selectedFilters'))
    if (savedFilters) {
      this.selectedFilters = savedFilters
    }

    const savedFields = JSON.parse(localStorage.getItem('selectedFields'))
    if (savedFields) {
      this.selectedFields = savedFields
    }
  }
}
</script>
<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.settings-popup {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.tabs {
  display: flex;
}

.tabs button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 10px;
  font-size: 16px;
}

.tabs button.activeTab {
  background-color: #ddd;
}

.tab-content {
  margin-top: 20px;
}

.tab-content h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.tab-content div {
  margin-bottom: 10px;
}

.tab-content input[type='checkbox'] {
  margin-right: 5px;
}

.selected-items {
  margin-top: 20px;
}

.selected-items h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.selected-items div {
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 3px;
}

.selected-items div:hover {
  background-color: #e0e0e0;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.user-table th,
.user-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.user-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.basic-info {
  background-color: #e6f2ff;
}

.advanced-info {
  background-color: #f9f9f9;
}
</style>
