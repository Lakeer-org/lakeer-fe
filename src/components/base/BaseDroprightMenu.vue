<template>
  <div class="dropdown-menu-right-custom metric-properties">
    <div class="metric-setting-dropdown row">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.dropdown-menu-right-custom {
  left: 110% !important;
  top: 0% !important;
}

.metric-setting-dropdown {
  padding: 20px 30px;
  border-radius: 2px;
  width: 300px
}
</style>
