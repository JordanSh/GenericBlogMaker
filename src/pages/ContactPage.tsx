import { Typography, Divider, List } from "antd";
import {
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { gbmconfig } from "../gbmconfig";

const { Title, Text, Link } = Typography;

export const ContactPage = () => {
  const contactDetails = [
    {
      title: <span>👤 Name</span>,
      content: gbmconfig.contactPage.name,
    },
    {
      title: <span>📧 Email</span>,
      content: gbmconfig.contactPage.email,
    },
    {
      title: <span>📞 Phone</span>,
      content: gbmconfig.contactPage.phone,
    },
    {
      title: (
        <span>
          <GithubOutlined /> GitHub
        </span>
      ),
      content: gbmconfig.contactPage.githubUrl,
    },
    {
      title: (
        <span>
          <LinkedinOutlined /> LinkedIn
        </span>
      ),
      content: gbmconfig.contactPage.linkedinUrl,
    },
    // Add more contact details as needed
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1}>Contact Details 💼</Title>
      <List
        itemLayout="horizontal"
        dataSource={contactDetails}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Text strong>{item.title}</Text>}
              description={
                <Text>
                  {typeof item.content === "string" &&
                  item.content.includes("http") ? (
                    <Link
                      href={item.content}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.content}
                    </Link>
                  ) : (
                    item.content
                  )}
                </Text>
              }
            />
          </List.Item>
        )}
      />
      <Divider />
      <Text type="secondary">{gbmconfig.contactPage.personalNote}</Text>
    </div>
  );
};
