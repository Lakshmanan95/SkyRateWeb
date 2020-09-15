import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MySqlConnect {
	
public static void main(String[] args) throws Exception{
	
	String account_num;
	String login_id;
	String date;
	
	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection(  
			"jdbc:mysql://localhost:3306/project2","root","laxmukesh"); 	

	
		BufferedReader bReader = new BufferedReader(new FileReader("D:\\flatfile.txt"));

		while (bReader != null) {
			String read;
			try {
					
				if ((read = bReader.readLine()) != null) {
					String[] array = read.split(";");
					account_num=array[0];
					login_id=array[1];
					date=array[2];
String query = "Insert into demo2(account,login,date)"+" values('"+array[0]+"','"+array[1]+"','"+array[2]+"')";					
					PreparedStatement st = con.prepareStatement(query);
					st.executeUpdate(query);
					}
				}
			catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}
}


