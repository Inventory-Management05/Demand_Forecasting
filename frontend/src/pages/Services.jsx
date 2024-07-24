import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-main">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: "3a8beb0b-0be1-4f5f-a5f9-40973c8d7de0",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=3a8beb0b-0be1-4f5f-a5f9-40973c8d7de0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtSC1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDQ5NjNjZTItYWY5NC00MTIyLTk1YTktNjQ0ZThiMDE2MjRkLyIsImlhdCI6MTcyMTc5NTc0MiwibmJmIjoxNzIxNzk1NzQyLCJleHAiOjE3MjE4MDEwMjgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUF2aEtobVNMNzdVT2NSa3F4QWh5ck5PVnZMc1lUclJ4NjlmZG51d0lMaCt6MldDWURqZU0rN3dOY2ZFWk1UTmZNIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiMjJCQ1QwMjE0IiwiZ2l2ZW5fbmFtZSI6IkFyeWFuIFNoYXJtYSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEzNi4yMzMuOS45NyIsIm5hbWUiOiJBcnlhbiBTaGFybWEiLCJvaWQiOiIzNjViOTExZS0xODlhLTRlNGUtYmQyNC1iZWRhNzA1YTFmOWUiLCJwdWlkIjoiMTAwMzIwMDIzQkVEREY2OCIsInJoIjoiMC5BVGNBNGp5VzFKU3ZJa0dWcVdST2l3RmlUUWtBQUFBQUFBQUF3QUFBQUFBQUFBQTNBSTAuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOG5tbzM4LVp2LWdzcFgxRW5hdzVJaWZZT2xjQmJ0M3RXVDBVc2MyQUozTSIsInRpZCI6ImQ0OTYzY2UyLWFmOTQtNDEyMi05NWE5LTY0NGU4YjAxNjI0ZCIsInVuaXF1ZV9uYW1lIjoiYXJ5YW4uc2hhcm1hMjAyMmFAdml0c3R1ZGVudC5hYy5pbiIsInVwbiI6ImFyeWFuLnNoYXJtYTIwMjJhQHZpdHN0dWRlbnQuYWMuaW4iLCJ1dGkiOiJsQWVVQjZEM2VFLW9ZNGU2LW9Tb0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAzMCJ9.OvZkymLFpUECSJqnIzRG4E_tLPmDal9dKfX6LpBfnWGVFJWKc33qDg-GFOLa6LqRbIHXhkqLEQF7saHsaoVabsQF-2FdtUWNEXla3at3EkbU-ubBDJNv1smAb5vOw4HitA1YSJXWNUIWWywV31kxhG2jN5uPYowl2d9B1epjXJYVr3k3qjkvduoZ9dzcys-1-Yg77nFA1jvV23WNOzQFwyRwVMnXGKFX_7gGu3CACxmFQ7s_xRvymjVLqljXhIVsr8SeQ1W2ly9E5aSqyvsrLcwQ0KDEtGkyfKKbgVWwZirW5iGqpDPAWqtNAYw4Aa85RfJ2V8XNcI4nXlYktW9NKg",
          tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
            ["visualClicked", () => console.log("visual clicked")],
            ["pageChanged", (event) => console.log(event)],
          ])
        }
        cssClassName={"reportClass"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  );
};

export default Services;