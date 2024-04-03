<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <!-- <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete"
        >
          {{ t('common.delete') }}
        </Button> -->
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('fms.IllustratedGuide.title') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              // {
              //   icon: 'ant-design:export-outlined',
              //   onClick: handleRelease.bind(null, record),
              // },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <StorageProviderDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  // import { Modal } from 'ant-design-vue';
  // import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '../../../components/Table';
  import { Button } from '../../../components/Button';
  import { useDrawer } from '../../../components/Drawer';

  import StorageProviderDrawer from './StorageProviderDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './storageProvider.data';
  import { getillustrationList,getillustrationDelete } from '../../../api/IllustratedGuide/IllustratedGuideList';

  export default defineComponent({
    name: 'IllustratedGuideList',
    components: { BasicTable, StorageProviderDrawer, TableAction, Button },
    setup() {
      const { t } = useI18n();
      // const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('fms.storageProvider.storageProviderList'),
        api: getillustrationList,
        // fetchSetting: {
        //   sizeField: "20",
        // },
        fetchSetting: {
          // sizeField: "page",
          // pageField: "pageNo"
        },
        // searchInfo: {
        // "isReply":2
        // },
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: false,
        actionColumn: {
          width: 30,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
        rowKey: 'id',
        // rowSelection: {
        //   type: 'checkbox',
        //   onChange: (selectedRowKeys, _selectedRows) => {
        //     selectedIds.value = selectedRowKeys as number[];
        //     showDeleteButton.value = selectedRowKeys.length > 0;
        //   },
        // },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleRelease(record){

      }

      function handleEdit(record) {
        const data = record;
        const labels = data.labels;
        let idArray = [];
        if (labels && labels.length !== 0) {
          idArray = labels.map((label) => label ? label.id : null).filter(Boolean);
        }
        console.log(labels);
        console.log(idArray);
        data['labels'] = idArray;
        console.log(data);
        openDrawer(true, {
          data,
          isUpdate: true,
        });
      }

      async function handleDelete(record) {
        const result = await getillustrationDelete({ "id": record.id });
        if (result.code === 0) {
          await reload();
        }
      }

      async function handleBatchDelete() {
        // Modal.confirm({
        //   title: t('common.deleteConfirm'),
        //   icon: createVNode(ExclamationCircleOutlined),
        //   async onOk() {
        //     const result = await deleteStorageProvider({ ids: selectedIds.value as number[] });
        //     if (result.code === 0) {
        //       showDeleteButton.value = false;
        //       await reload();
        //     }
        //   },
        //   onCancel() {
        //     console.log('Cancel');
        //   },
        // });
      }

      async function handleSuccess() {
        await reload();
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        showDeleteButton,
        handleRelease,
      };
    },
  });
</script>
