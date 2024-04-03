<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '../../../components/Form/index';
  import { extraParamColumns, formSchema } from './tagList.data';
  import { BasicDrawer, useDrawerInner } from '../../../components/Drawer';
  import { useI18n } from 'vue-i18n';
  import {
    getlabelCreate,
    getlabelUpdate,
  } from '../../../api/IllustratedGuide/IllustratedGuideList';
  import { useMessage } from '../../../hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',
    components: {
      BasicDrawer,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const menuId = ref<number>(0);
      const { createMessage } = useMessage();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 160,
        layout: 'vertical',
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        if ('record' in data) {
          menuId.value = data.record.id;
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('fms.IllustratedGuide.addlabel') : t('fms.IllustratedGuide.editlabel'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });

        values['parentId'] = values['parentId'] != '0' ? values['parentId'] : '0';
        values['recordState'] = 2;
        if (unref(isUpdate)) {
          values['id'] = menuId.value;
        }

        if (values['parentId'] === values['id'] && unref(isUpdate)) {
          createMessage.error(t('common.notAllowSameAsParentId'));
          setDrawerProps({ confirmLoading: false });
          return;
        }
        console.log(values);
        const result = unref(isUpdate)
          ? await getlabelUpdate(values)
          : await getlabelCreate(values);
        if (result.code === 0) {
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        t,
        isUpdate,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        extraParamColumns,
      };
    },
  });
</script>
<style scoped>
  .paramForm {
    padding: 1em;
  }
</style>
