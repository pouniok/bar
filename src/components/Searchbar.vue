<template>
    <!-- Search -->
    <form class="mb-4">
        <div class="input-group">
            <input type="text"
                   class="form-control"
                   placeholder="Chercher quelqu'un..."
                   aria-label="Search"
                   @keyup="$emit('search', $event.target.value)">
            <div class="input-group-append">
                <button class="btn btn-ico btn-secondary btn-minimal" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </form>
    <!-- Search -->
</template>

<script>
    export default {
        name: "Searchbar"
    }
</script>

<style scoped>

</style>