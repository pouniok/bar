<template>
    <div class="card border-light rounded-lg">
        <div class="card-body">
            <div class="media">
                <div class="avatar mr-3">
                    <template v-if="employee.icon">
                        <img class="avatar-img" :src="employee.icon" alt="Employee icon">
                    </template>
                    <template v-else>
                        <img class="avatar-img" src="../assets/beer.png" alt="Employee icon">
                    </template>
                </div>

                <div class="media-body overflow-hidden">
                    <div class="d-flex align-items-center mb-1">
                        <h6 class="text-truncate mb-0 mr-auto">{{ employee.firstname }} {{ employee.lastname }}</h6>
                        <p class="small text-muted text-nowrap ml-4">{{ employee.birthday | moment('L') }}</p>
                    </div>
                    <div class="text-truncate">{{ barCount }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'EmployeeListItem',
  props: ['employee'],
  computed: {
      barCount() {
          const barCount = [].concat(this.employee.bars).length;
          const s = barCount > 1 ? 's' : '';

          return `${barCount} bar${s} proposé${s}`;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .avatar {
        display: inline-block;
        position: relative;
        line-height: 0;
    }
    .avatar img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }

    .avatar i, .avatar span {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    p:last-child {
        margin-bottom: 0;
    }

    .selected .card {
        background-color: #efca50;
    }

    .selected .text-truncate {
        color: #333;
    }
</style>
