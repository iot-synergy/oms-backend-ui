<template>
  <BasicModal
    v-bind="$attrs"
    title=""
    @register="registerModal"
    :wrapperFooterOffset="50"
    cancelText=""
    :showOkBtn="false"
  >
    <BasicTable @register="registerTable" :searchInfo="searchInfo" class="tableHeight">
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import DeleteOutlined from '@ant-design/icons-vue/lib/icons/DeleteOutlined';
  import ExclamationCircleOutlined from '@ant-design/icons-vue/lib/icons/ExclamationCircleOutlined';
  import { Modal } from 'ant-design-vue';
  import { createVNode, defineComponent, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { columns } from '../../IllustratedGuide/IllustratedGuideList/storageProvider.data';
  import { Button } from '../../../components/Button';
  import { BasicModal, useModalInner } from '../../../components/Modal';
  import { BasicTable, useTable } from '../../../components/Table';
  // import { useMessage } from '/@/hooks/web/useMessage';
  import { getgallerypage } from '../../../api/member/member';
  import { Recordable } from '../../../../packages/types/src/utils';

  export default defineComponent({
    components: { BasicModal, BasicTable, DeleteOutlined, Button },
    setup() {
      const { t } = useI18n();
      // const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);
      // const { notification } = useMessage();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getgallerypage,
        columns,
        formConfig: {
          labelWidth: 120,
          // schemas: searchFormSchema,
        },
        // fetchSetting: {
        //   sizeField: "",
        //   pageField: ""
        // },
        searchInfo: searchInfo,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: false,
        rowKey: 'id',
        // rowSelection: {
        //   type: 'checkbox',
        //   onChange: (selectedRowKeys, _selectedRows) => {
        //     selectedIds.value = selectedRowKeys as number[];
        //     showDeleteButton.value = selectedRowKeys.length > 0;
        //   },
        // },
      });

      const [registerModal] = useModalInner(async (data) => {
        searchInfo.userId = data.record.id;
        console.log(searchInfo);
      });

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            // const result = await deleteEmailLog({ ids: selectedIds.value as string[] });
            // if (result.code === 0) {
            //   showDeleteButton.value = false;
            //   notification.success({
            //     message: t('common.successful'),
            //     description: t(result.msg),
            //     duration: 3,
            //   });
            await reload();
            // }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      return {
        t,
        registerTable,
        showDeleteButton,
        handleBatchDelete,
        registerModal,
        searchInfo,
      };
    },
  });
</script>
