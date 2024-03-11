<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <a-descriptions :title="t('fms.device.device')" bordered>
      <a-descriptions-item :label="t('fms.device.deviceName')" :span="3">{{
        dataMap.deviceName
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.serialNumber')" :span="3">{{
        dataMap.serialNumber
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.activatedTime')" :span="3">{{
        dataMap.activatedTime == '' ? '' : formatToDateTime(dataMap.activatedTime)
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.adminName')" :span="3">{{}}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.deviceVipLevel')" :span="3">{{
        dataMap.deviceVipLevel
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.onlinestatus')" :span="3">
        <a-tag :color="dataMap.online == 1 ? 'green' : 'red'">{{
          dataMap.online == 1 ? t('fms.device.online') : t('fms.device.offline')
        }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.firmwareld')" :span="3">
        {{ dataMap.firmwareld }}
      </a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.firmwareStatus')" :span="3">{{
        dataMap.firmwareStatus
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.icon')" :span="3">
        <a-image :width="50" :src="dataMap.icon"
      /></a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.macAddress')" :span="3">{{
        dataMap.macAddress
      }}</a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.personDetect')" :span="3">
        <a-tag :color="dataMap.personDetect == 1 ? 'green' : 'red'">{{
          dataMap.personDetect == 1 ? t('fms.device.off') : t('fms.device.on')
        }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item :label="t('fms.device.supportBirdVip')" :span="3">
        <a-tag :color="dataMap.supportBirdVip ? 'green' : 'red'">{{
          dataMap.supportBirdVip ? t('fms.device.off') : t('fms.device.on')
        }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <BasicForm v-if="isUpdate" @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { Descriptions, Tag,Image } from 'ant-design-vue';
  import { formatToDateTime } from '../../../utils/dateUtil';
  import { BasicForm, useForm } from '../../../components/Form/index';
  import { formSchema } from './storageProvider.data';
  import { BasicDrawer, useDrawerInner } from '../../../components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { getMmsapicommentDetail, updateReplyComment } from '../../../api/feed/feedback';
  import { DeviceInfo } from '../../../api/device/deviceModel';

  export default defineComponent({
    name: 'deviceDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      'a-descriptions': Descriptions,
      'a-tag': Tag,
      'a-image': Image,
      'a-descriptions-item': Descriptions.Item,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const dataMap = ref<DeviceInfo>({});

      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 110,
        baseColProps: { span: 24 },
        layout: 'vertical',
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        // queryDetail(data?.record.id);
        console.log('====================================');
        console.log(data?.record);
        dataMap.value = data?.record;
        console.log('====================================');
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
          // dataMap.value = result.data;
          // console.log('1111111');
          // console.log(result.data);
          // console.log('--------------------');
          // console.log(dataMap.value);
        }
      }

      const getTitle = computed(() =>
        !unref(isUpdate) ? "" : t('fms.feedback.name'),
      );

      async function handleSubmit() {
        if (!isUpdate) {
          // const values = await validate();
          // setDrawerProps({ confirmLoading: true });
          // // values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
          // let result = await updateReplyComment({
          //   reply: values['name'],
          //   commentId: dataMap.value.id,
          // });
          // if (result.code === 0) {
          //   closeDrawer();
          //   emit('success');
          //   console.log('====================================');
          //   console.log(result);
          //   console.log('====================================');
          // }
          // setDrawerProps({ confirmLoading: false });
        } else {
          closeDrawer();
        }
      }

      return {
        t,
        isUpdate,
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
