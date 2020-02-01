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
    .form-control {
        display: block;
        width: 100%;
        height: calc(1.6em + 1.875rem + 2px);
        padding: .9375rem 1.25rem;
        font-size: .9375rem;
        font-weight: 400;
        line-height: 1.6;
        color: #7f808c;
        background-color: #edeef6;
        background-clip: padding-box;
        border: 1px solid #edeef6;
        -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    }
    .form-control::placeholder {
        color: #9e9fae;
    }
    .form-control:focus {
        color: #7f808c;
        background-color: #edeef6;
        border-color: #edeef6;
        box-shadow: none;
    }
    .btn-secondary.btn-minimal {
        color: rgba(33,37,41,.35);
        fill: rgba(33,37,41,.35);
        background-color: #edeef6;
        border-color: #edeef6;
    }
</style>