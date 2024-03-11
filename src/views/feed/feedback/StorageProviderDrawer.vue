<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <div style="margin-bottom: 30px">
      <div>
        <div style="font-size: 20px; margin-bottom: 10px"></div>
        <div style="font-size: 18px">标题：{{ dataMap.title }}</div>
        <div style="font-size: 18px; margin-top: 5px">详情：{{ dataMap.content }}</div>
        <div style="font-size: 14px; margin-top: 10px; color: gray">{{
          formatToDateTime(dataMap.createTime)
        }}</div>
      </div>
      <div style="margin-left: 20px; margin-top: 20px">
        <div v-for="(item, index) in dataMap.reply" :key="index">
          <div style="font-size: 18px; margin-top: 5px">{{ item['reply'] }}</div>
          <div style="font-size: 14px; margin-top: 10px; color: gray">{{
            formatToDateTime(item['createTime'])
          }}</div>
        </div>
      </div>
    </div>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './storageProvider.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { getMmsapicommentDetail, updateReplyComment } from '/@/api/feed/feedback';
  import { FeedbackInfo } from '/@/api/feed/feedbackModel';

  export default defineComponent({
    name: 'feedbackDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const dataMap = ref<FeedbackInfo>({});

      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 110,
        baseColProps: { span: 24 },
        layout: 'vertical',
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps,closeDrawer }] = useDrawerInner(async (data) => {
        queryDetail(data?.record.id);
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });
      async function queryDetail(id) {
        const result = await getMmsapicommentDetail({
          id: id,
        });
        if (result.code == 0) {
          dataMap.value = result.data;
          console.log('1111111');
          console.log(result.data);
          console.log('--------------------');
          console.log(dataMap.value);
        }
      }

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('fms.feedback.name') : t('fms.feedback.name'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
        let result = await updateReplyComment({
          reply: values['name'],
          commentId: dataMap.value.id,
        });
        if (result.code === 0) {
          closeDrawer();
          emit('success');
          console.log('====================================');
          console.log(result);
          console.log('====================================');
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        dataMap,
        formatToDateTime,
        registerDrawer,
        registerForm,
        queryDetail,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
