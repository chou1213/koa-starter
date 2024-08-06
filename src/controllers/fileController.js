const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const { success, fail } = require('../utils/index')

const client = new OSS({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  accessKeySecret: process.env.ACCESSKEYSECRET,
  bucket: process.env.BUCKET
});

const put = async (file) => {
  // 本地文件路径
  const localFilePath = file.path;

  // 在 OSS 上保存的文件名称
  const ossFileName = path.basename(file.originalname);

  // 上传文件到 OSS
  const result = await client.put('report/' + ossFileName, localFilePath);

  // 删除本地临时文件
  fs.unlinkSync(localFilePath);

  return result;
}

const uploadSingle = async (ctx) => {
  const file = ctx.file;
  let result;

  try {
    result = await put(file)
  } catch (err) {
    console.log(err)
    return fail('Failed to upload some files to OSS', 10000)
  }

  return success({
    name: result.name,
    url: result.url,
  })
}

const uploadBatch = async (ctx) => {
  console.log(ctx.files)

  const files = ctx.files;

  const uploadResults = [];

  for (const file of files) {
    try {
      const result = await put(file)

      // 将上传结果保存到数组
      uploadResults.push({
        name: result.name,
        url: result.url,
      });

    } catch (err) {
      console.error(err);
      return fail('Failed to upload some files to OSS', 10000)
    }
  }
  return success(uploadResults)
}

const uploadMulter = async (ctx) => {
  const files = ctx.files;
  const uploadResults = [];

  for (const key of Object.keys(files)) {
    const list = files[key];

    for (const file of list) {

      // console.log(file)
      try {
        const result = await put(file)

        // 将上传结果保存到数组
        uploadResults.push({
          name: result.name,
          url: result.url,
        });

      } catch (err) {
        console.error(err);
        return fail('Failed to upload some files to OSS', 10000)
      }
    }
  }

  return success(uploadResults)
}

module.exports = {
  uploadSingle,
  uploadBatch,
  uploadMulter
}