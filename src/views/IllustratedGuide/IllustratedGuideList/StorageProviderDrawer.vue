<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <div style="margin-bottom: 10px"><span style="color: red">* </span> 名称: </div>
    <a-select
      v-model:value="selectedValue"
      show-search
      allow-clear
      style="width: 450px"
      placeholder="Select a person"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
      ref="selectRef"
      @popupScroll="handleScroll"
    >
      <a-select-option v-for="option in options" :key="option.classesId" :value="option.value">
        {{ option.englishName }}
      </a-select-option>
    </a-select>
    <BasicForm @register="registerForm" />
    <div>
      <div style="margin-bottom: 10px"><span style="color: red">* </span> 图片: </div>
      <a-upload
        action="/fms-api/cloud_file/upload"
        name="file"
        list-type="picture-card"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :show-upload-list="false"
        :file-list="fileList"
        :maxCount="1"
      >
        <div v-if="fileList.length === 0">
          <div class="ant-upload-text">上传</div>
        </div>
        <img v-else :src="fileList[0]" alt="avatar" style="width: 90px; height: 90px" />
      </a-upload>
    </div>
    <div>
      <div style="margin-bottom: 10px"><span style="color: red">* </span> 背景图: </div>
      <a-upload
        action="/fms-api/cloud_file/upload"
        name="file"
        list-type="picture-card"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-success="handleSuccesson"
        :show-upload-list="false"
        :file-list="moreImages"
        :maxCount="1"
      >
        <div v-if="moreImages.length === 0">
          <div class="ant-upload-text">上传</div>
        </div>
        <img v-else :src="moreImages[0]" alt="avatar" style="width: 90px; height: 90px" />
      </a-upload>
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  // import { formatToDateTime } from '/@/utils/dateUtil';
  import { formatToDateTime } from '../../../utils/dateUtil';
  import { BasicForm, useForm } from '../../../components/Form/index';
  import { formSchema } from './storageProvider.data';
  import { BasicDrawer, useDrawerInner } from '../../../components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { Upload, message, Select } from 'ant-design-vue';
  import {
    getillustrationCreate,
    getillustrationUpdate,
    getClassesList,
  } from '../../../api/IllustratedGuide/IllustratedGuideList';
  import { useUserStore } from '/@/store/modules/user';
  import type { UploadProps } from 'ant-design-vue';

  export default defineComponent({
    name: 'IllustratedGuideDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      'a-upload': Upload,
      'a-select': Select,
      'a-select-option': Select.Option,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const userStore = useUserStore();
      const menuId = ref<number>(0);

      const { t } = useI18n();
      const fileList = ref<UploadProps['fileList']>([]);
      const moreImages = ref<UploadProps['fileList']>([]);

      const selectedValue = ref(undefined);
      const options = ref<any[]>([]);
      const page = ref(1);
      const loading = ref(false);

      const headers = {
        Authorization: userStore.getToken,
      };

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 110,
        baseColProps: { span: 24 },
        layout: 'vertical',
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        options.value = [];
        page.value = 1;
        fetchData('');
        if (unref(isUpdate)) {
          console.log(data.data);
          fileList.value = [data.data.imagePath];
          if (data.data.moreImages != null && data.data.moreImages != '') {
            moreImages.value = data.data.moreImages;
          }
          menuId.value = data.data.id;
          selectedValue.value = data.data.classesId;
          setFieldsValue({
            ...data.data,
          });
        } else {
          selectedValue.value = undefined;
          moreImages.value = [];
          fileList.value = [];
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('fms.IllustratedGuide.title') : t('fms.IllustratedGuide.edittitle'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        if (unref(isUpdate)) {
          values['id'] = menuId.value;
        }
        values['iconPath'] = fileList.value[0];
        values['imagePath'] = fileList.value[0];
        values['moreImages'] = moreImages.value;
        if (!unref(isUpdate)) {
          values['type'] = 'Illustrated';
        }
        values['classesId'] = selectedValue.value;
        let result = !unref(isUpdate)
          ? await getillustrationCreate(values)
          : await getillustrationUpdate(values);
        if (result.code === 0) {
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
      }

      const beforeUpload = (file: File) => {
        // 检查文件类型
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能上传 JPG/PNG 格式的图片!');
        }
        return isJpgOrPng;
      };

      const handleSuccess = (response: any, file: any) => {
        if (response.data.url != null) {
          fileList.value = [
            // {
            //   uid: '-1',
            //   name: file.name,
            //   status: 'done',
            //   url: response.data.url,
            // },
            response.data.url,
          ];
          console.log(fileList);
        }
        // message.success(`${file.name} 上传成功`);
      };

      const handleSuccesson = (response: any, file: any) => {
        if (response.data.url != null) {
          moreImages.value = [
            // {
            //   uid: '-1',
            //   name: file.name,
            //   status: 'done',
            //   url: response.data.url,
            // },
            response.data.url,
          ];
          console.log(moreImages.value);
        }
      };

      const fetchData = async (value: string) => {
        loading.value = true;
        let params = {
          page: page.value,
          pageSize: 50,
        };
        if (value != '') {
          params['keyword'] = value;
        }
        let result = await getClassesList(params);
        console.log('------------');
        if (result['data']['data'].length == 50) {
          loading.value = false;
          page.value++;
          options.value.push(...result['data']['data']);
          console.log(options.value);
        } else {
          loading.value = true;
          options.value.push(...result['data']['data']);
        }
      };

      const handleScroll = (event) => {
        const target = event.target;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight && !loading.value) {
          console.log('滑到底部了');
          fetchData('');
        }
      };

      const handleSearch = async (value: string) => {
        console.log(value);
        page.value = 1;
        options.value = [];
        fetchData(value);
      };

      return {
        fileList,
        moreImages,
        headers,
        formatToDateTime,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        beforeUpload,
        handleSuccess,
        handleSuccesson,
        selectedValue,
        options,
        loading,
        handleSearch,
        handleScroll,
      };
    },
  });
</script>

<style lang="less">
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
