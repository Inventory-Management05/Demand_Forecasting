import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./Services.css";

const Services = () => {
  // Replace this URL with your Power BI embed URL or token
  // const powerBiEmbedUrl = 'https://app.powerbi.com/reportEmbed?reportId=3a8beb0b-0be1-4f5f-a5f9-40973c8d7de0&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d';

  return (
    <div className="services-main">
      <h2 className="services-title">Visualization</h2>
      {/* <div className="services-description">
        <p>We offer a range of services to help you manage your inventory efficiently and forecast demand accurately.</p>
      </div> */}
      <div className="reportClass">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: "014d053a-7a9c-4a22-9368-c36def42f3e1",
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=014d053a-7a9c-4a22-9368-c36def42f3e1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtSC1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDQ5NjNjZTItYWY5NC00MTIyLTk1YTktNjQ0ZThiMDE2MjRkLyIsImlhdCI6MTcyMjE5NTA0NywibmJmIjoxNzIyMTk1MDQ3LCJleHAiOjE3MjIyMDAyMzIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFhTEl2TmQ0L2xmdXlOWll3cm44VHVtTElsbkt1L1BwWGlQR0ZtazBhVG5XR1VtRWV3SHFGYy9ZKzRRSmRXM0J4IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiMjJCQ1QwMjE0IiwiZ2l2ZW5fbmFtZSI6IkFyeWFuIFNoYXJtYSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIyMy4xODcuMTIzLjkwIiwibmFtZSI6IkFyeWFuIFNoYXJtYSIsIm9pZCI6IjM2NWI5MTFlLTE4OWEtNGU0ZS1iZDI0LWJlZGE3MDVhMWY5ZSIsInB1aWQiOiIxMDAzMjAwMjNCRURERjY4IiwicmgiOiIwLkFUY0E0anlXMUpTdklrR1ZxV1JPaXdGaVRRa0FBQUFBQUFBQXdBQUFBQUFBQUFBM0FJMC4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiI4bm1vMzgtWnYtZ3NwWDFFbmF3NUlpZllPbGNCYnQzdFdUMFVzYzJBSjNNIiwidGlkIjoiZDQ5NjNjZTItYWY5NC00MTIyLTk1YTktNjQ0ZThiMDE2MjRkIiwidW5pcXVlX25hbWUiOiJhcnlhbi5zaGFybWEyMDIyYUB2aXRzdHVkZW50LmFjLmluIiwidXBuIjoiYXJ5YW4uc2hhcm1hMjAyMmFAdml0c3R1ZGVudC5hYy5pbiIsInV0aSI6IjhJNU9fM2RZRWtlaDhER29Lck1FQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxMCAxIn0.fhqLt0rL9E9nu_yEZ80a08lve0V9IukUM5po5UTMlgRI__J2AlD9A-Wq95kTg-1Xhvh7TSyxZrB5K85Ng5kFOALBOR1VPGe6HcD9QBdzkQxdiNGlDw7IwGjpXg-z5gYXeWjuvOYk-w01FBJ-YJL3YlZq3lefVROtJTemWEpHAUpC9taktfhR8tRlHbKyeBGN1uwlow3ifBb2mw1MoCu9sZbSptX2vLGBNP6elQI8QbZtvk_hWPwlumU40sn70TCj3xaHZ0DYS65tx0p4ZHxyBfbygJH2xipHSZptVXXXylFJ5AqNhKrVYPjXBZjPlkzBNF-8qPHxWLLsHRZHMcgL9g",
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
    </div>
  );
};

export default Services;
