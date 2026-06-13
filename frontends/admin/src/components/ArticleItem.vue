<template>
  <q-card flat bordered class="q-pa-xs">
    <q-badge
      color="red-8"
      v-if="props.article.badge"
      floating
      class="text-bold"
      style="height: 2.5em; border-bottom-left-radius: 12px; border-top-right-radius: 12px"
    >
      {{ props.article.badge }}</q-badge
    >

    <q-card-section
      class="q-pa-none q-ma-none q-mt-md"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <p class="text-center q-ma-none text-bold">{{ props.article.name }}</p>
      <p class="text-center text-overline text-bold text-primary">
        + {{ Math.floor(Math.random() * 100) }} diamonds bonus
      </p>

      <p class="text-center">{{ props.article.price }} Ar</p>
    </q-card-section>

    <q-separator />

    <q-card-actions class="q-pa-none q-gutter-md flex justify-end">
      <q-btn outline flat no-caps icon="edit" color="grey" @click="() => (editDialog = true)">
        <article-input-dialog
          :article="{ ...props.article }"
          v-model="editDialog"
          @finished="(article: Partial<IArticle>) => handleEditArticle(article)"
        >
          <q-item-label class="q-ma-md text-h6">Modifier l'article</q-item-label>
        </article-input-dialog>
      </q-btn>
      <q-btn outline flat no-caps icon="delete" color="negative" @click="deleteDialog" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { IArticle } from '@shared/Types/Interfaces'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import ArticleInputDialog from './ArticleInputDialog.vue'
import { useArticleStore } from '@/stores/article.store.ts'

const props = defineProps<{
  article: IArticle
}>()
const editDialog = ref<boolean>(false)
const $q = useQuasar()

const $articleStore = useArticleStore()
const handleEditArticle = async (newArticle: Partial<IArticle>) => {
  newArticle.offerId = props.article.offerId
  const updatedArticle = await $articleStore.update(newArticle._id!, newArticle)
  props.article.name = updatedArticle.name
  props.article.price = updatedArticle.price
  props.article.badge = updatedArticle.badge
  props.article.description = updatedArticle.description
  props.article.updatedAt = updatedArticle.updatedAt
}

const deleteDialog = () => {
  $q.dialog({
    title: 'Suppression',
    message: 'Voulez-vous vraiment supprimer cette article ?',
    cancel: {
      label: 'Non',
      noCaps: true,
      flat: true,
    },
    ok: {
      label: 'Oui',
      noCaps: true,
      flat: true,
      color: 'negative',
    },
    persistent: true,
  }).onOk(async () => {
    const deleted = await $articleStore.deleteFn(props.article._id)
  })
}
</script>
