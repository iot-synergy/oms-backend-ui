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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ic:round-library-books',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEditVIP.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <StorageProviderDrawer @register="registerDrawer" @success="handleSuccess" />
    <Modal
      v-model:open="videoVisible"
      title=""
      width="30%"
      wrap-class-name="full-modal"
      @ok="handleDownloadVideo"
    >
      <div style="padding: 50px">
        VIP等级：
        <Select ref="select" v-model:value="value" style="width: 120px" @change="handleChange">
          <a-select-option value="0">0</a-select-option>
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
        </Select>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Modal, Select } from 'ant-design-vue';
  // import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '../../../components/Table';
  import { Button } from '../../../components/Button';

  import { useDrawer } from '../../../components/Drawer';
  import StorageProviderDrawer from './StorageProviderDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './storageProvider.data';
  import {
    getQueryLocalDevices,
    getMmsapiUpdateDeviceVipSet,
  } from '../../../api/device/deviceList';

  export default defineComponent({
    name: 'device',
    components: { BasicTable, StorageProviderDrawer, TableAction, Button, Modal, Select },
    setup() {
      const { t } = useI18n();
      const showDeleteButton = ref<boolean>(false);
      const videoVisible = ref<boolean>(false);
      const value = ref('');
      const serialNumber = ref('');

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('fms.storageProvider.storageProviderList'),
        api: getQueryLocalDevices,
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
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: false,
        });
      }
      function handleEditVIP(record: Recordable) {
        videoVisible.value = true;
        value.value = record.deviceVipLevel;
        serialNumber.value = record.serialNumber;
      }
      function handleChange() {}

      // async function handleDelete(record: Recordable) {
      // const result = await deleteStorageProvider({ ids: [record.id] });
      // if (result.code === 0) {
      //   await reload();
      // }
      // }
      async function handleDownloadVideo() {
        let result = await getMmsapiUpdateDeviceVipSet({
          serialNumber: serialNumber.value,
          productId: value.value,
        });
        if (result.code === 0) {
          // emit('success');
          videoVisible.value = false;
          serialNumber.value = '';
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
        value,
        videoVisible,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleEditVIP,
        handleChange,
        handleDownloadVideo,
        handleSuccess,
        handleBatchDelete,
        showDeleteButton,
      };
    },
  });
</script>
