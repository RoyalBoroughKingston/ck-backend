<template>
  <div>
    <gov-inset-text v-for="(galleryItem, index) in galleryItems" :key="galleryItem.$index">
      <ck-image-input
        @input="onGalleryItemInput($event, index)"
        :id="`Ck::GalleryItem::${galleryItem.$index}`"
        label="Upload an item to the gallery"
        accept="image/x-png"
        :existing-url="galleryItem.hasOwnProperty('url') ? galleryItem.url : undefined"
      />

      <gov-error-message
        v-if="errors.has(`gallery_items.${index}`) || errors.has(`gallery_items.${index}.file_id`)"
        v-text="errors.get([`gallery_items.${index}`, `gallery_items.${index}.file_id`])"
        :for="galleryItem.$index"
      />

      <gov-button @click="onDeleteGalleryItem(index)" error>Delete</gov-button>
    </gov-inset-text>

    <div>
      <gov-button @click="onAddGalleryItem">
        <template v-if="galleryItems.length === 0">Add gallery item</template>
        <template v-else>Add another</template>
      </gov-button>
    </div>
  </div>
</template>

<script>
import CkImageInput from "@/components/Ck/CkImageInput";

export default {
  name: "GalleryItemsInput",

  components: { CkImageInput },

  model: {
    prop: "galleryItems",
    event: "input"
  },

  props: {
    galleryItems: {
      type: Array,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      index: 1
    };
  },

  methods: {
    clone() {
      return JSON.parse(JSON.stringify(this.galleryItems));
    },

    onGalleryItemInput(event, index) {
      const galleryItems = this.clone();
      galleryItems[index].file_id = event.file_id;
      galleryItems[index].image = event.iamge;
      this.$emit("input", galleryItems);
    },

    onAddGalleryItem() {
      const galleryItems = this.clone();
      galleryItems.push({
        file_id: null,
        image: null,
        $index: this.index
      });
      this.$emit("input", galleryItems);

      this.index++;
    },

    onDeleteGalleryItem(deleteIndex) {
      let galleryItems = this.clone();
      this.$delete(galleryItems, deleteIndex);
      this.$emit("input", galleryItems);
      this.$emit("clear", `gallery_items.${deleteIndex}`);
      this.$emit("clear", `gallery_items.${deleteIndex}.file_id`);
    },
  }
};
</script>
