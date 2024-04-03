import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getMenuList } from '/@/api/sys/menu';
import { ParentIdEnum } from '/@/enums/appEnum';
import { uploadImageApi ,uploadImageIconApi } from '/@/api/fms/file';
import { getlabelList } from '../../../api/IllustratedGuide/IllustratedGuideList';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 30,
    customRender: ({ record }) => {
      return formatToDateTime(record.createTime);
    },
  },
  {
    title: t('fms.IllustratedGuide.name'),
    dataIndex: 'title',
    width: 50,
  },
  {
    title: t('fms.IllustratedGuide.score'),
    dataIndex: 'score',
    width: 50,
  },
  {
    title: t('fms.IllustratedGuide.Wikipedia'),
    dataIndex: 'wikiUrl',
    width: 50,
  },
  {
    title: t('fms.IllustratedGuide.image'),
    dataIndex: 'imagePath',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: t('fms.storageProvider.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'state',
  //   label: t('fms.feedback.type'),
  //   colProps: { span: 8 },
  //   component: 'Select',
  //   // defaultValue: 0,
  //   componentProps: {
  //     options: [
  //       { label: t('fms.feedback.all'), value: 2 },
  //       { label: t('fms.feedback.noReply'), value: 1 },
  //       { label: t('fms.feedback.replied'), value: 0 },
  //     ],
  //   },
  // },
  {
    field: 'state',
    label: t('common.status'),
    colProps: { span: 8 },
    component: 'Select',
    // defaultValue: 0,
    componentProps: {
      options: [
        { label: "已发布", value: 2 },
        { label: "未发布", value: 1 },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: t('fms.IllustratedGuide.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'score',
    label: t('fms.IllustratedGuide.score'),
    component: 'Rate',
    required: true,
  },
  {
    field: 'wikiUrl',
    label: t('fms.IllustratedGuide.Wikipedia'),
    component: 'Input',
    required: true,
  },
  // {
  //   field: 'imagePath',
  //   label: t('fms.IllustratedGuide.image'),
  //   defaultValue: '',
  //   component: 'ImageUpload',
  //   show: true,
  //   required: true,
  //   componentProps: {
  //     // api: uploadImageApi,
  //     api: uploadImageIconApi,
  //     maxNumber:1,
  //   },
  // },
  // {
  //   field: 'moreImages',
  //   label: t('fms.IllustratedGuide.back'),
  //   defaultValue: '',
  //   component: 'ImageUpload',
  //   show: true,
  //   required: true,
  //   changeEvent:"change",
  //   componentProps: {
  //     api: uploadImageApi,
  //     maxNumber:1,
  //   },
  // },
  {
    field: 'labels',
    label: t('fms.tag.tag'),
    component: 'ApiMultipleSelect',
    required: true,
    componentProps: {
      api: getlabelList,
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
      params: {
        page: 1,
        pageSize: 1000,
      },
    },
  },
  {
    field: 'recordState',
    label: t('common.status'),
    component: 'RadioButtonGroup',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: t('common.on'), value:2 },
        { label: t('common.off'), value:1 },
      ],
    },
  },
  {
    field: 'description',
    label: t('fms.IllustratedGuide.details'),
    component: 'InputTextArea',
    required: true,
  },
];
