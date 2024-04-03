<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('fms.IllustratedGuide.addlabel') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
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
    <TagDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '../../../components/Table';
  import { useI18n } from 'vue-i18n';
  import { getlabelList,deleteLable} from '../../../api/IllustratedGuide/IllustratedGuideList';

  import { useDrawer } from '../../../components/Drawer';
  import TagDrawer from './TagDrawer.vue';

  import { columns } from './tagList.data';
  import { PageWrapper } from '../../../components/Page';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, TagDrawer, TableAction, PageWrapper },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: "",
        api: getlabelList,
        columns,
        formConfig: {
          labelWidth: 120,
        //   schemas: searchFormSchema,
        },
        fetchSetting: {},
        isTreeTable: true,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: false,
        //   canResize: false,
        actionColumn: {
          width: 80,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record) {
        const result = await deleteLable({ "id": record.id }, 'notice');
        if (result.code === 0) {
          await reload();
        }
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
      };
    },
  });
</script>
