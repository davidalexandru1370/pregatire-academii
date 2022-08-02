CREATE TABLE [dbo].[Tokens] (
    [UserIdFK]     INT NOT NULL ,
    [AccessToken]  NVARCHAR (MAX) NULL,
    [RefreshToken] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Tokens] PRIMARY KEY CLUSTERED ([UserIdFK] ASC),
	CONSTRAINT FK_Tokens FOREIGN KEY (UserIdFK) references Users(id)
	
);

