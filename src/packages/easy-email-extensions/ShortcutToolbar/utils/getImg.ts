import { ImageManager } from 'easy-email-core';

const defaultImagesMap = {
  IMAGE_08:
    'https://edit.url2.shop' + '/images/0046b247-3647-491f-afe1-cb0dd2a3c21c-ef84b752-f827-4546-89bf-6b63dfb67a4d.png',
  IMAGE_09:
    'https://edit.url2.shop' + '/images/be34fb18-32ad-441c-84d8-3c0e9ba9f742-ad2ea5ff-5d0b-446b-bd7d-8e2ab5afdd16.png',
  IMAGE_10:
    'https://edit.url2.shop' + '/images/6a1e6292-469e-452a-bbae-44e4b5ff7463-05e543b6-c951-44ce-ae27-ca1282c77f52.png',
  IMAGE_11:
    'https://edit.url2.shop' + '/images/39b25f35-7ca9-4264-8502-41f430f89cf5-bcdc91c2-da3c-4fef-99c0-62b77c5a0f1f.png',
  IMAGE_12:
    'https://edit.url2.shop' + '/images/eaa83007-f6f5-47d9-acbe-bb98065eaf20-b7c46090-73bd-4d4b-bd31-2368f7b4064f.png',
  IMAGE_13:
    'https://edit.url2.shop' + '/images/9dec87bb-0a6d-429f-ac23-0ee636e6428d-219dee7e-85bb-4fba-9bf3-e98762e80409.png',
  IMAGE_14:
    'https://edit.url2.shop' + '/images/d285da5e-b0c0-4895-84ac-42f83b4d603b-64042d20-be6a-45de-819c-8312f778a38d.png',
  IMAGE_15:
    'https://edit.url2.shop' + '/images/f69f48af-5b15-40aa-91c4-81d601d1357b-083dc99d-02a6-40d9-ae28-0662bd078b5d.png',
  IMAGE_16:
    'https://edit.url2.shop' + '/images/9cce6b16-5a98-4ddb-b1a1-6cec2cf56891-c3acb856-8ab8-4cfb-93f9-2a0747678b8b.png',
  IMAGE_17:
    'https://edit.url2.shop' + '/images/d9795c1d-fa32-4adb-ab25-30b7cfe87936-df21314f-6f05-4550-80b3-9ab1107e8fbe.png',
  IMAGE_18:
    'https://edit.url2.shop' + '/images/82f6f893-43ed-4f3d-9a17-4740bda844de-3318b36c-199d-46fe-96b8-38d1f17ef0c1.png',
  IMAGE_19:
    'https://edit.url2.shop' + '/images/f1ece227-e050-4751-b064-aaeeabd5bfde-d459e9a2-b192-417b-8a77-2297b29e814e.png',
  IMAGE_20:
    'https://edit.url2.shop' + '/images/585b48f6-ee7c-4d1a-8619-4d2edea09be6-07113335-5d19-464a-adef-2be50682ce72.png',
  IMAGE_21:
    'https://edit.url2.shop' + '/images/9755d667-289e-405c-b84a-adf5db91ea4d-c03c409b-dd9b-40e9-840a-6a64e1df594e.png',
  IMAGE_22:
    'https://edit.url2.shop' + '/images/7487ce49-cd69-4651-8da3-807c54357258-defaaf0a-1756-4b83-9a94-51dcdbfeb84f.png',
  IMAGE_23:
    'https://edit.url2.shop' + '/images/c3463b9e-baff-41c8-95ee-01c5a79259bd-8062ab05-baa5-45d2-9959-4935d4ff2005.png',
  IMAGE_24:
    'https://edit.url2.shop' + '/images/1f45e84a-5c84-45ce-9d27-df6ffb55bcdd-cbf126f4-b372-4ea9-a354-0dc27be4ce2f.png',
  IMAGE_25:
    'https://edit.url2.shop' + '/images/6b8b234e-2306-48f9-90ed-056c13201a83-492073c3-258f-4f1b-91fa-4a8ae723aa2c.png',
  IMAGE_26:
    'https://edit.url2.shop' + '/images/aa50c2c9-8e3b-4af2-b029-337ec549ec10-baacd015-2e3f-4326-b3ab-bde84a7c456b.png',
  IMAGE_27:
    'https://edit.url2.shop' + '/images/9e935e54-a97e-4fbb-a2fb-73e351a35eed-479ef4d1-9460-48b2-934d-84d77044b98d.png',
  IMAGE_28:
    'https://edit.url2.shop' + '/images/799564d8-3082-4fdc-86ed-8c4b3510934f-3f8ccbaa-7b6b-49b7-a836-21fa88f996fc.png',
  IMAGE_29:
    'https://edit.url2.shop' + '/images/af34a548-c339-4a9e-85fe-11bf90c083eb-46fef91d-7307-4e91-aae0-460da1c48629.png',
  IMAGE_30:
    'https://edit.url2.shop' + '/images/84014a93-429c-479c-b9ed-0c568f58a288-ca76cdf2-92d3-4552-bc95-3a8dd4c9cd0b.png',
  IMAGE_31:
    'https://edit.url2.shop' + '/images/dd1584fb-cb60-42c9-80c7-5545e16130ca-226ba72b-ce9e-4948-ad0d-347381fb96c5.png',
  IMAGE_32:
    'https://edit.url2.shop' + '/images/76e3d8e2-697d-484c-a989-715bd234b575-37bde239-2e2d-450a-8e93-d62c39cb94a3.png',
  IMAGE_33:
    'https://edit.url2.shop' + '/images/898b791e-c8fc-4bc5-bf1e-47a0351284ce-fdee9617-9848-49e7-82b6-36095f417a3e.png',
  IMAGE_34:
    'https://edit.url2.shop' + '/images/49662d27-6e14-4e75-a942-946f0af25a51-e9aa2ead-98e4-4f70-8073-7b5aaafaa367.png',
  IMAGE_35:
    'https://edit.url2.shop' + '/images/d2905fb1-9fc1-49c0-90b0-806877c38cd2-f2e05655-4e6c-41b0-a028-990448a716dc.png',
  IMAGE_36:
    'https://edit.url2.shop' + '/images/9c3e9949-1be7-42b5-ad48-44f0e1c89c2e-2ee3cbac-e45e-414d-96ad-9dae3621cf14.png',
  IMAGE_37:
    'https://edit.url2.shop' + '/images/1865e3a6-a762-4bd9-9644-96ae6b27a83a-176a20c7-5768-400c-b2eb-701500cee17c.png',
  IMAGE_38:
    'https://edit.url2.shop' + '/images/2a6d82e2-d1f6-4e30-ae05-1afe3cd03e70-22d186b0-c2f1-4aee-b33b-869cae26412e.png',
  IMAGE_39:
    'https://edit.url2.shop' + '/images/9f97bda2-82d6-47e7-80c1-40be94d5491f-88233d55-8715-43cd-9232-246440e33cd6.png',
  IMAGE_40:
    'https://edit.url2.shop' + '/images/b8f00c77-12b0-4e61-a85e-96918c0035dc-b8344b64-8e79-424d-a974-8e13e6b1e7f8.png',
  IMAGE_41:
    'https://edit.url2.shop' + '/images/5fc6be85-0205-4ca9-bb9a-eb9335f94af2-2d41c4bb-2c00-4fe7-8b32-067e92df3ab3.png',
  IMAGE_42:
    'https://edit.url2.shop' + '/images/f6c9c054-f35a-4af7-957f-c7a6209972eb-7e3b42bf-8d97-466d-8662-8d3b1786e8b8.png',
  IMAGE_43:
    'https://edit.url2.shop' + '/images/80e108b0-3d70-442a-93c1-3fcc091253c6-3dc61b44-6072-413a-ae28-a551577b7677.png',
  IMAGE_44:
    'https://edit.url2.shop' + '/images/14b9e878-7208-48f4-94d0-51161b79010a-fb55ae68-a7ce-4bae-830d-331d368f0f32.png',
  IMAGE_45:
    'https://edit.url2.shop' + '/images/b42f3cd8-01fc-4650-a32d-b584b05e78c3-5e408f98-e9e6-43de-97af-91b2732760df.png',
  IMAGE_46:
    'https://edit.url2.shop' + '/images/e737972a-d884-440b-96d3-66f703dd110b-9f1d0d18-fb45-4a54-a2d0-65bc5b168f8a.png',
  IMAGE_47:
    'https://edit.url2.shop' + '/images/0e3ae071-247a-4e69-8b60-8009477180b9-197205c2-2ae7-420f-94aa-78440226beaa.png',
  IMAGE_48:
    'https://edit.url2.shop' + '/images/0ec46619-4dd0-4293-88fb-14656ac7d33c-0936deed-a88c-4e3d-90bf-4fe67b295659.png',
  IMAGE_49:
    'https://edit.url2.shop' + '/images/01830aec-d044-4d2a-9519-aac2901f4760-776602f7-021b-4142-a2d0-446aca5e0418.png',
  IMAGE_50:
    'https://edit.url2.shop' + '/images/9f1cee25-f9b4-4539-b4ea-3109584c0a54-0692c4fb-46ce-452c-8573-fcce74852cba.png',
  IMAGE_51:
    'https://edit.url2.shop' + '/images/e138143f-7071-44bc-8470-7d56850e527c-f515254e-67b8-4b68-b86f-7993e960d893.png',
  IMAGE_52:
    'https://edit.url2.shop' + '/images/ac75b655-b57d-40b9-a201-8163eeb6a579-1f894e6f-18ac-42c4-9227-7488433586bc.png',
  IMAGE_53:
    'https://edit.url2.shop' + '/images/3c505a1b-575a-40fb-83c1-6c4a11a6d478-9e466e35-af9e-406a-b4cc-b86f9d0b0419.png',
  IMAGE_54:
    'https://edit.url2.shop' + '/images/7f98eeec-9422-48b5-9b57-939a24418b92-a6346a63-b393-49c2-9911-ee1a9a1ffd02.png',
  IMAGE_55:
    'https://edit.url2.shop' + '/images/a7f5ae44-418b-40e1-b8a5-8162cf8bbd87-156cc8dd-3a19-4638-8c26-e28783e50952.png',
  IMAGE_56:
    'https://edit.url2.shop' + '/images/efdeeced-1eb7-465f-8370-a3b000634ba2-0a4d1794-6ca7-44fa-a1c6-04e3bde8eb56.png',
  IMAGE_57:
    'https://edit.url2.shop' + '/images/425c6017-2c30-41d7-8930-08300492c6d4-a0859ca3-5213-484c-9170-2d51329407cc.png',
  IMAGE_58:
    'https://edit.url2.shop' + '/images/858ea699-cf65-469d-bd9e-70adea729bb4-c4e7a711-27b6-4865-9b32-516c41cebddf.png',
  IMAGE_59:
    'https://edit.url2.shop' + '/images/06ca521d-9728-4de6-a709-1b75a828bfc3-2a9b1224-3d71-43b8-b52f-e7cdcdc9107b.png',
  IMAGE_60:
    'https://edit.url2.shop' + '/images/199eacfa-daf8-4dd1-a356-225a265a88a4-e8432435-a2bb-4ec2-a3e9-ee1757d8b44b.png',
  IMAGE_61:
    'https://edit.url2.shop' + '/images/f43b67dc-cc30-4533-b2ca-4689292aab4d-40bc844d-5362-451f-a839-69e86f7a3113.png',
  IMAGE_62:
    'https://edit.url2.shop' + '/images/318e911c-a57b-4768-9c79-0e49c2953e7a-dbe0eb3c-0b4b-495a-a469-a15b46c5a0cc.png',
  IMAGE_63:
    'https://edit.url2.shop' + '/images/ed70ddb1-1344-4245-ab1e-beae36ed44b4-21a80cb3-a928-4857-973b-98992fdec74f.png',
  IMAGE_64:
    'https://edit.url2.shop' + '/images/fb7dd6fa-12c1-41e1-8744-91d0f861ec57-0fee9bda-2381-4c54-a24d-bd644384b9aa.png',
  IMAGE_65:
    'https://edit.url2.shop' + '/images/7bf8c363-17bd-472d-8cca-96f5d4b64292-9ab34957-15d3-4068-8e83-cc283d8e400d.png',
  IMAGE_66:
    'https://edit.url2.shop' + '/images/0330a1e9-e814-4be8-83f0-ee1dbabf44a0-6e35a585-92ec-4570-875b-866b59927583.png',
  IMAGE_67:
    'https://edit.url2.shop' + '/images/a7deb6bc-db2b-4273-bf25-002bb148bf5a-ed5e9b17-15a9-4e0f-9874-c3219d48b2b4.png',
  IMAGE_68:
    'https://edit.url2.shop' + '/images/52c50319-e3a9-401b-9057-bd6531870f10-aa79ec5d-76d2-4d48-a99e-2ccd9d9c285b.png',
  IMAGE_69:
    'https://edit.url2.shop' + '/images/9994cef3-6205-4013-8993-b037d067df64-f5d03db4-6bb4-4af4-b35a-0b6d512eaff4.png',
  IMAGE_70:
    'https://edit.url2.shop' + '/images/e5dd7a7e-70d7-483f-80cc-0c5b41107101-75dcedc7-4a34-4d03-97ee-bf32163afa0a.png',
  IMAGE_71:
    'https://edit.url2.shop' + '/images/53277265-8e54-43d0-b9d0-d34cd1639861-adb7a48a-8382-43a1-ad59-7c84764a3b21.png',
};

ImageManager.add(defaultImagesMap);

export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}
