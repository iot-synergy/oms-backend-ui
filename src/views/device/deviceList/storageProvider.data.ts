import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateStorageProvider } from '/@/api/fms/storageProvider';
import { Switch, Tag } from 'ant-design-vue';
import { h } from 'vue';
import { useRedo } from '/@/hooks/web/usePage';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('fms.device.activatedTime'),
    dataIndex: 'activatedTime',
    width: 30,
    customRender: ({ record }) => {
      return record.activatedTime ==null?"": formatToDateTime(record.activatedTime);
    },
  },
  {
    title: t('fms.device.deviceName'),
    dataIndex: 'deviceName',
    width: 50,
  },
  {
    title: t('fms.device.serialNumber'),
    dataIndex: 'serialNumber',
    width: 50,
  },
  {
    title: t('fms.device.adminName'),
    dataIndex: 'adminName',
    width: 50,
  },
  {
    title: t('fms.device.deviceVipLevel'),
    dataIndex: 'deviceVipLevel',
    width: 50,
  },
  {
    title: t('fms.device.onlinestatus'),
    dataIndex: 'online',
    width: 50,
    customRender: ({ record }) => {
      let resultText = '';
      if (record.online === 1) {
        resultText = t('fms.device.online');
      } else {
        resultText = t('fms.device.offline');
      }
      return h(
        Tag,
        {
          color: record.isRequired === true ? 'green' : 'red',
        },
        () => resultText,
      );
    },
  },
  {
    title: t('fms.device.personDetect'),
    dataIndex: 'status',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'personDetect')) {
        record.personDetect = 0;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('fms.device.off'),
        unCheckedChildren: t('fms.device.on'),
        loading: record.personDetect,
        onChange(checked, _) {
          record.personDetect = true;
          const newStatus = checked ? 1 : 0;
          // updateDepartment({ id: record.id, status: newStatus })
          //   .then(() => {
          //     record.status = newStatus;
          //   })
          //   .finally(() => {
          //     record.pendingStatus = false;
          //   });
        },
      });
    },
  },
  {
    title: t('fms.device.supportBirdVip'),
    dataIndex: 'status',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'supportBirdVip')) {
        record.supportBirdVip = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('fms.device.off'),
        unCheckedChildren: t('fms.device.on'),
        loading: record.supportBirdVip,
        onChange(checked, _) {
          record.supportBirdVip = true;
          const newStatus = checked ? 1 : 0;
          // updateDepartment({ id: record.id, status: newStatus })
          //   .then(() => {
          //     record.status = newStatus;
          //   })
          //   .finally(() => {
          //     record.pendingStatus = false;
          //   });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('fms.storageProvider.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: t('fms.feedback.type'),
    colProps: { span: 8 },
    component: 'Select',
    // defaultValue: 0,
    componentProps: {
      options: [
        { label: t('fms.feedback.all'), value: 2 },
        { label: t('fms.feedback.noReply'), value: 1 },
        { label: t('fms.feedback.replied'), value: 0 },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  // {
  //   field: 'id',
  //   label: 'ID',
  //   component: 'Input',
  //   show: false,;
  // },
  {
    field: 'name',
    label: t('fms.feedback.content'),
    component: 'InputTextArea',
    required: true,
    // helpMessage: t('fms.storageProvider.nameHelpMessage'),
  },
  // {
  //   field: 'bucket',
  //   label: t('fms.storageProvider.bucket'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'secretId',
  //   label: t('fms.storageProvider.secretId'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'secretKey',
  //   label: t('fms.storageProvider.secretKey'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'endpoint',
  //   label: t('fms.storageProvider.endpoint'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'folder',
  //   label: t('fms.storageProvider.folder'),
  //   component: 'Input',
  //   helpMessage: t('fms.storageProvider.folderHelpMessage'),
  // },
  // {
  //   field: 'region',
  //   label: t('fms.storageProvider.region'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'isDefault',
  //   label: t('fms.storageProvider.isDefault'),
  //   component: 'RadioButtonGroup',
  //   defaultValue: false,
  //   componentProps: {
  //     options: [
  //       { label: t('common.on'), value: false },
  //       { label: t('common.off'), value: true },
  //     ],
  //   },
  //   required: true,
  // },
  // {
  //   field: 'state',
  //   label: t('fms.storageProvider.state'),
  //   component: 'RadioButtonGroup',
  //   defaultValue: true,
  //   componentProps: {
  //     options: [
  //       { label: t('common.on'), value: true },
  //       { label: t('common.off'), value: false },
  //     ],
  //   },
  // },
];
