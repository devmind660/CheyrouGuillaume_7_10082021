<template>
  <ErrorMessage error="404" message="La page demandée n'a pas été trouvée ou n'existe pas"></ErrorMessage>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage"

export default {
  name: 'Error',
  components: { ErrorMessage }
}
</script>