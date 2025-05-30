export default function ContactPage() {
  return (
    <div className="container mx-auto p-6 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="contact-item">
          <h2 className="contact-title">office</h2>
          <div className="content">
            <p className="mb-2">#1202, Guangyin Creative Factory, No.83, Yanzigangnan Road, Haizhu district, Guangzhou, China. 510280</p>
            <p className="mb-2">广州市海珠区燕子岗南路广印创意园1202</p>
          </div>
        </div>

        <div className="contact-item">
          <h2 className="contact-title">social</h2>
          <div className="content">
            <p className="mb-2">instagram: @another_lab</p>
            <p className="mb-2">wechat: anotherdesign</p>
            <p className="mb-2">小红书：anotherdesign</p>
          </div>
        </div>

        <div className="contact-item">
          <h2 className="contact-title">contact</h2>
          <div className="content">
            <p className="mb-2">商务合作 Business Contact</p>
            <p className="mb-2">business@vansion.cn.com</p>
            <p className="mb-4">出版及应聘Publication & Job</p>
            <p className="mb-2">info@vansion.cn.com</p>
            <p className="mb-2">tel: 020-89636400</p>
          </div>
        </div>
      </div>
    </div>
  );
}
