package prijt;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
public class ImportData {
	 public static void main(String[] args) 
	    {
	        DBase db = new DBase();
	        Connection conn = db.connect("jdbc:mysql://localhost:3306/project1","root","laxmukesh");
	        db.importData(conn,"D:\\flatfile2.csv");
	        }
	 
	}
	 
	class DBase
	{
	    public DBase()
	    {
	    }
	 
	    public Connection connect(String db_connect_str, 
	  String db_userid, String db_password)
	    {
	        Connection conn;
	        try
	        {
	            Class.forName("com.mysql.jdbc.Driver").newInstance();
	            conn = DriverManager.getConnection(db_connect_str,db_userid, db_password);
          	        }
	        catch(Exception e)
	        {
	            e.printStackTrace();
	            conn = null;
	        }
	 	        return conn;    
	    }
	     
	    public void importData(Connection conn,String filename)
	    {
	        Statement stmt;
	        String query;
	 	        try
	        {
	            stmt = conn.createStatement();
	 	            query = "LOAD DATA LOCAL INFILE '" + "D:\\flatfile.csv" + "' INTO TABLE demo1 FIELDS TERMINATED BY ';'"
	            		+ "  LINES TERMINATED BY '\n' (account,login,date);";
	 	            stmt.executeUpdate(query);	           
	        }
	        catch(Exception e)
	        {
	            e.printStackTrace();
	            stmt = null;
	        }
	    }
}
