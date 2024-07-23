import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import './Services.css';

const Services = () => {
  return (
    <div className="services-main">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: "1fc978c8-d83c-472c-a82e-ea4460144635",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=1fc978c8-d83c-472c-a82e-ea4460144635&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtSC1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDQ5NjNjZTItYWY5NC00MTIyLTk1YTktNjQ0ZThiMDE2MjRkLyIsImlhdCI6MTcyMTU0NTk0OSwibmJmIjoxNzIxNTQ1OTQ5LCJleHAiOjE3MjE1NTA5MzIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFkT3FVeEhpdlRNb0pQTU5DWWhSQ1ZRbm5WTVdlZG5XUFUvdVNocUtieGw1M1hHLzI1eklxQk5qUWdVdGY2c25sIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiMjJCQ1QwMjE0IiwiZ2l2ZW5fbmFtZSI6IkFyeWFuIFNoYXJtYSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIyMy4xODcuMTE4LjEyMiIsIm5hbWUiOiJBcnlhbiBTaGFybWEiLCJvaWQiOiIzNjViOTExZS0xODlhLTRlNGUtYmQyNC1iZWRhNzA1YTFmOWUiLCJwdWlkIjoiMTAwMzIwMDIzQkVEREY2OCIsInJoIjoiMC5BVGNBNGp5VzFKU3ZJa0dWcVdST2l3RmlUUWtBQUFBQUFBQUF3QUFBQUFBQUFBQTNBSTAuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOG5tbzM4LVp2LWdzcFgxRW5hdzVJaWZZT2xjQmJ0M3RXVDBVc2MyQUozTSIsInRpZCI6ImQ0OTYzY2UyLWFmOTQtNDEyMi05NWE5LTY0NGU4YjAxNjI0ZCIsInVuaXF1ZV9uYW1lIjoiYXJ5YW4uc2hhcm1hMjAyMmFAdml0c3R1ZGVudC5hYy5pbiIsInVwbiI6ImFyeWFuLnNoYXJtYTIwMjJhQHZpdHN0dWRlbnQuYWMuaW4iLCJ1dGkiOiJxbk5ZVVJJWWRVLS1BSjlKRlJnaUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiNiAxIn0.VPzH96XP2L6eq8awqd88nnvWqhWOG4N45RGGxSlSw-lsf05bcoreTIZgMdjtXhjNM2P3pqDfpQ7KkoqZ289cFyZUKV6S6lpqhc2cjPjsCaLcbyOmjDpSsljtcPaPo1xHA7E_YWJpXj-sgVF8znG7pinc5mZlBOoGZLpgxKnUimTK7WBJGysvUfO6v72AV1f3dicfJo1iwdulwBMpc1YMA0hryonwv_lHB4NbPZL3ARmrtsc6Tf7Ph8BnWaDG-qL4pMEROKQrWl7sa9Jwpw0v3tIgirOlOTX7tuC9bE5aeuZujHq4apxlnlcEXskL3ex8zOk-ymoVF33kXUbJ_Q191A",
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
