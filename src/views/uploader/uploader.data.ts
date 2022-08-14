import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.apis.path'),
    dataIndex: 'path',
    width: 200,
  },
  {
    title: t('sys.apis.group'),
    dataIndex: 'group',
    width: 50,
  },
  {
    title: t('sys.apis.description'),
    dataIndex: 'description',
    width: 200,
    customRender: ({ record }) => {
      return t(record.description);
    },
  },
  {
    title: t('sys.apis.method'),
    dataIndex: 'method',
    width: 50,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createAt',
    width: 150,
    customRender: ({ record }) => {
      return formatToDateTime(record.createAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'path',
    label: t('sys.apis.path'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'path',
    label: t('sys.apis.path'),
    required: true,
    component: 'Input',
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    required: true,
    component: 'Input',
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    required: true,
    component: 'Input',
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
      ],
    },
  },
];
